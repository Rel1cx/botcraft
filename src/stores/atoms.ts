import { produce } from "immer";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atomWithImmer } from "jotai-immer";
import { omit } from "rambda";
import toast from "react-hot-toast";
import { animationFrameScheduler, concatMap, observeOn } from "rxjs";
import { stringify } from "telejson";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";

import { generateChatCompletionStream, generateChatTitle, initChat, type MessageData } from "@/bot";
import { DEFAULT_API_ENDPOINT } from "@/constants";
import type { Locales } from "@/i18n/i18n-types";
import { localStorageGetItem } from "@/lib/browser";
import type { ChatCompletionTask } from "@/types";
import { type ChatID, makeMessageID, type MessageID } from "@/zod/id";

import { botsDb, chatsDb, messagesDb } from "./db";

export const apiKeyAtom = atomWithStorage("API_KEY", localStorageGetItem("API_KEY", ""));

export const endpointAtom = atomWithStorage("ENDPOINT", localStorageGetItem("ENDPOINT", DEFAULT_API_ENDPOINT));

export const titleLocaleAtom = atomWithStorage<Locales>("TITLE_LOCALE", localStorageGetItem("TITLE_LOCALE", "en"));

export const botListAtom = atom((get) => {
    const bots = get(botsDb.values);
    return bots.map((bot) => ({
        id: bot.name,
        title: bot.name,
        icon: bot.icon,
    }));
});

export const addChatAtom = atom(null, async (get, set, botName: string) => {
    const bot = get(botsDb.item(botName));
    invariant(bot, `Bot ${botName} not found`);
    const newChat = initChat()(bot);
    const messageKeys = newChat.content.map((message) => message.id);
    const messagesEntries = newChat.content.map<[string, MessageData]>((message) => [message.id, message]);
    const chat = {
        ...omit(["content"], newChat),
        messages: messageKeys,
    };

    await set(messagesDb.setMany, messagesEntries);

    await set(chatsDb.set, chat.id, chat);

    await set(
        botsDb.set,
        botName,
        produce((draft) => {
            invariant(draft, `Bot ${botName} not found`);
            draft.chats.push(chat.id);
        }),
    );
});

export const removeChatAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
    const bot = get(botsDb.item(botName));
    invariant(bot, `Bot ${botName} not found`);
    const isLastChat = bot.chats.length === 1;

    await set(
        botsDb.set,
        botName,
        produce((draft) => {
            invariant(draft, `Bot ${botName} not found`);
            draft.chats = draft.chats.filter((chatID) => chatID !== id);
        }),
    );

    // await set(chatsDb.delete, id)
    await set(
        chatsDb.set,
        id,
        produce((draft) => {
            invariant(draft, `Chat ${id} not found`);
            draft.deleted = true;
        }),
    );

    if (!isLastChat) {
        return;
    }

    await set(addChatAtom, botName);
});

export const restoreChatAtom = atom(null, async (get, set, botName: string, id: ChatID) => {
    const bot = get(botsDb.item(botName));
    invariant(bot, `Bot ${botName} not found`);

    await set(
        chatsDb.set,
        id,
        produce((draft) => {
            invariant(draft, `Chat ${id} not found`);
            draft.deleted = false;
        }),
    );

    await set(
        botsDb.set,
        botName,
        produce((draft) => {
            invariant(draft, `Bot ${botName} not found`);
            draft.chats.push(id);
        }),
    );
});

export const addMessageAtom = atom(null, async (get, set, id: ChatID, data: MessageData) => {
    const chat = get(chatsDb.item(id));
    invariant(chat, `Chat ${id} not found`);
    await set(messagesDb.set, data.id, data);
    await set(
        chatsDb.set,
        id,
        produce((draft) => {
            invariant(draft, `Chat ${id} not found`);
            draft.messages.push(data.id);
            draft.updatedAt = Date.now();
        }),
    );
});

export const removeMessageAtom = atom(null, async (get, set, chatID: ChatID, id: MessageID) => {
    const chat = get(chatsDb.item(chatID));
    invariant(chat, `Chat ${chatID} not found`);
    await set(
        chatsDb.set,
        chatID,
        produce((draft) => {
            invariant(draft, `Chat ${chatID} not found`);
            draft.messages = draft.messages.filter((messageID) => messageID !== id);
            draft.updatedAt = Date.now();
        }),
    );

    await set(messagesDb.delete, id);
});

export const chatCompletionTasksAtom = atomWithImmer<Record<ChatID, ChatCompletionTask>>({});

export const updateChatCompletionAtom = atom(
    null,
    async (get, set, botName: string, id: ChatID, messageID?: MessageID) => {
        const apiKey = get(apiKeyAtom);

        const endpoint = get(endpointAtom);

        const bot = get(botsDb.item(botName));

        invariant(bot, `Bot ${botName} not found`);

        const chat = get(chatsDb.item(id));

        invariant(chat, `Chat ${id} not found`);

        const abortController = new AbortController();

        const messagesLoaded = await Promise.all(chat.messages.map((id) => get(messagesDb.item(id))));

        const messages = messagesLoaded.filter(Boolean);

        const completionMode = messageID ? "update" : "create";

        const completionMessageID = messageID ?? makeMessageID();

        const contextMessages = match(completionMode)
            .with("create", () => messages)
            .with("update", () => {
                const updateMessageIndex = messages.findIndex((message) => message.id === completionMessageID);

                if (updateMessageIndex === -1) {
                    throw new Error(`Message ${completionMessageID} not found`);
                }

                return messages.slice(0, updateMessageIndex);
            })
            .exhaustive();

        set(chatCompletionTasksAtom, (draft) => {
            draft[id] = {
                type: "sending",
                messageID: completionMessageID,
                abort: () => {
                    abortController.abort();
                },
            };
        });

        const handleError = (err: unknown) => {
            const error = err instanceof Error ? err : new Error(stringify(err));

            toast.error(`Failed to generate chat completion: Error: ${error.name}\nMessage: ${error.message}`);

            set(chatCompletionTasksAtom, (draft) => {
                draft[id] = {
                    type: "errored",
                    messageID: completionMessageID,
                    error,
                };
            });
        };

        const result = await generateChatCompletionStream(
            apiKey,
            endpoint,
            {
                ...omit(["messages"], chat),
                content: contextMessages,
            },
            abortController.signal,
        )(bot);

        if (!result.isOk()) {
            const error = result.getError();
            handleError(error);
            return;
        }

        await match(completionMode)
            .with("create", () => {
                const message: MessageData = {
                    id: completionMessageID,
                    content: "",
                    role: "assistant",
                    updatedAt: Date.now(),
                };

                return set(addMessageAtom, id, message);
            })
            .with("update", async () => {
                await set(
                    messagesDb.set,
                    completionMessageID,
                    produce((draft) => {
                        invariant(draft, `Message ${completionMessageID} not found`);
                        draft.content = "";
                    }),
                );

                await set(
                    chatsDb.set,
                    id,
                    produce((draft) => {
                        invariant(draft, `Chat ${id} not found`);
                        draft.updatedAt = Date.now();
                    }),
                );
            })
            .exhaustive();

        set(chatCompletionTasksAtom, (draft) => {
            draft[id] = {
                type: "replying",
                messageID: completionMessageID,
                abort: () => {
                    abortController.abort();
                },
            };
        });

        const stream = result.get();

        stream
            .pipe(
                observeOn(animationFrameScheduler),
                concatMap(async (msg) => {
                    await set(
                        messagesDb.set,
                        completionMessageID,
                        produce((draft) => {
                            invariant(draft, `Message ${completionMessageID} not found`);
                            draft.content += msg;
                        }),
                    );
                }),
            )
            .subscribe({
                error: (err: unknown) => {
                    handleError(err);
                },
                async complete() {
                    set(chatCompletionTasksAtom, (draft) => {
                        draft[id] = { type: "completed", messageID: completionMessageID };
                    });

                    const chat = get(chatsDb.item(id));

                    invariant(chat, `Chat ${id} not found`);

                    const messages = await Promise.all(
                        chat.messages.map((id) => get(messagesDb.item(id))).filter(Boolean),
                    );
                    const titleLocale = get(titleLocaleAtom);

                    if (messages.length < 2 || messages.length > 10) {
                        return;
                    }

                    const result = await generateChatTitle(
                        apiKey,
                        endpoint,
                        {
                            ...omit(["messages"], chat),
                            content: messages,
                        },
                        titleLocale,
                    )(bot);

                    if (!result.isOk()) {
                        return;
                    }

                    await set(
                        chatsDb.set,
                        id,
                        produce((draft) => {
                            invariant(draft, `Chat ${id} not found`);
                            draft.title = result.get();
                        }),
                    );
                },
            });
    },
);
