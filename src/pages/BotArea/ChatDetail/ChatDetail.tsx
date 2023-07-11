import { Button } from "@ariakit/react";
import { LoadingOverlay, Overlay } from "@mantine/core";
import { Chat as ChatIcon, ChatDots } from "@phosphor-icons/react";
import { Option as O } from "@swan-io/boxed";
import clsx from "clsx";
import { produce } from "immer";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { sortBy } from "rambda";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import invariant from "tiny-invariant";
import { match, P } from "ts-pattern";

import type { MessageData } from "@/bot";
import Icon from "@/components/atoms/Icon/Icon";
import Redirect from "@/components/atoms/Redirect/Redirect";
import TitleInput from "@/components/atoms/TitleInput/TitleInput";
import { isContainTarget } from "@/lib/browser";
import { Router } from "@/router";
import {
    addChatAtom,
    addMessageAtom,
    chatCompletionTasksAtom,
    removeChatAtom,
    removeMessageAtom,
    restoreChatAtom,
    updateChatCompletionAtom,
    useChat,
    useChats,
    useMessage,
} from "@/stores";
import { draftsDb, messagesDb } from "@/stores/db";
import { tappable } from "@/theme/base.css";
import { vars } from "@/theme/vars.css";
import { type ChatID, isChatID, makeMessageID, type MessageID } from "@/zod/id";

import { Layout } from "../Layout/Layout";
import * as css from "./styles.css";

const Chat = React.lazy(() => import("@/components/Chat/Chat"));

const Message = React.lazy(() => import("@/components/Message/Message"));

const ChatList = React.lazy(() => import("@/components/ChatList/ChatList"));

const ConfirmDialog = React.lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"));

const MessageEditor = React.lazy(() => import("@/components/MessageEditor/MessageEditor"));

type ChatDetailProps = {
    botName: string;
    chatID: ChatID;
};

type ChatIconPresenterProps = {
    id: ChatID;
    selected: boolean;
};

type AsideProps = {
    botName: string;
    selectedChatID: ChatID;
    onAddChatClick: () => void;
    onRemoveChatClick: (id: string) => void;
};

type ChatMessagePresenterProps = {
    botName: string;
    chatID: ChatID;
    id: MessageID;
};

type MessageEditorPresenterProps = {
    botName: string;
    chatID: ChatID;
};

const ChatIconPresenter = React.memo(({ id, selected }: ChatIconPresenterProps) => {
    const [chat] = useChat(id);

    const messageLength = chat?.messages.length ?? 0;

    const color = selected ? "#fff" : vars.colors.text;

    return (
        <Icon
            style={{
                flexShrink: 0,
            }}
            as={messageLength > 1 ? ChatDots : ChatIcon}
            color={color}
        />
    );
});

const ChatMessagePresenter = React.memo(({ botName, chatID, id }: ChatMessagePresenterProps) => {
    const [data] = useMessage(id);
    const setDraft = useSetAtom(draftsDb.set);
    const removeMessage = useSetAtom(removeMessageAtom);
    const updateChatCompletion = useSetAtom(updateChatCompletionAtom);

    const handleRemoveClick = React.useCallback(() => {
        void removeMessage(chatID, id);
    }, [chatID, id, removeMessage]);

    const handleRegenerateClick = React.useCallback(() => {
        void match(data)
            .with({ role: "assistant" }, () => {
                return updateChatCompletion(botName, chatID, id);
            })
            .with({ role: "user" }, (data) => {
                return setDraft(chatID, {
                    messageID: O.Some(id),
                    content: data.content,
                });
            })
            .run();
    }, [botName, chatID, data, id, setDraft, updateChatCompletion]);

    return React.useMemo(
        () =>
            match(data)
                .with(P.nullish, () => null)
                .with({ role: "system" }, () => null)
                .otherwise((data) => {
                    return (
                        <React.Suspense>
                            <Message
                                id={id}
                                data={data}
                                onRemoveClick={handleRemoveClick}
                                onRegenerateClick={handleRegenerateClick}
                            />
                        </React.Suspense>
                    );
                }),
        [id, data, handleRegenerateClick, handleRemoveClick],
    );
});

const MessageEditorPresenter = React.memo(({ botName, chatID }: MessageEditorPresenterProps) => {
    const messageEditorRef = React.useRef<HTMLInputElement>(null);
    const deleteDraft = useSetAtom(draftsDb.delete);
    const addMessage = useSetAtom(addMessageAtom);
    const setMessage = useSetAtom(messagesDb.set);
    const requestChatCompletion = useSetAtom(updateChatCompletionAtom);
    const task = useAtomValue(chatCompletionTasksAtom)[chatID];
    const [key, setKey] = React.useState(0);
    const [draft, setDraft] = useAtom(draftsDb.item(chatID));
    const content = draft?.content ?? "";
    const messageID = draft?.messageID ?? O.None();
    const isGenerating = task?.type === "sending" || task?.type === "replying";

    const updateMessage = React.useCallback(
        (messageID: MessageID, content: string) => {
            return setMessage(
                messageID,
                produce((draft) => {
                    if (!draft) {
                        return;
                    }
                    draft.content = content;
                }),
            );
        },
        [setMessage],
    );

    const createMessage = React.useCallback(
        async (content: string) => {
            const message: MessageData = {
                id: makeMessageID(),
                content,
                role: "user",
                updatedAt: Date.now(),
            };

            await addMessage(chatID, message);
        },
        [addMessage, chatID],
    );

    const handleChange = React.useCallback(
        (value: string) => {
            match(value)
                .with("", () => {
                    void deleteDraft(chatID);
                })
                .with(P.string, () => {
                    void setDraft({
                        content: value,
                        messageID,
                    });
                })
                .exhaustive();
        },
        [chatID, deleteDraft, messageID, setDraft],
    );

    useHotkeys(
        "ctrl+enter",
        async (ev) => {
            const { target } = ev;
            const container = messageEditorRef.current;
            if (!container || !target || !isContainTarget(target, container) || isGenerating) {
                return;
            }

            const trimmedContent = content.trim();

            if (!trimmedContent) {
                return;
            }

            ev.preventDefault();

            void deleteDraft(chatID);
            setKey((prev) => prev + 1);

            await messageID.match({
                None: async () => {
                    await createMessage(trimmedContent);

                    requestAnimationFrame(() => {
                        const chatEl = document.querySelector(`#${chatID}`);
                        invariant(chatEl, "chat element not found");
                        chatEl.scrollTop = chatEl.scrollHeight;
                    });

                    await requestChatCompletion(botName, chatID);
                },
                Some: async (messageID) => {
                    requestAnimationFrame(() => {
                        const messageEl = document.querySelector(`#${messageID}`);
                        invariant(messageEl, "message element not found");
                        messageEl.scrollIntoView({
                            behavior: "smooth",
                            block: "end",
                        });
                    });
                    await updateMessage(messageID, trimmedContent);
                },
            });
        },
        {
            enableOnContentEditable: true,
        },
    );

    return (
        <React.Suspense fallback={<LoadingOverlay visible />}>
            <MessageEditor key={key} ref={messageEditorRef} content={content} onChange={handleChange} />
        </React.Suspense>
    );
});

const Aside = ({ botName, onAddChatClick, onRemoveChatClick, selectedChatID }: AsideProps) => {
    const chatsMeta = useChats(botName);

    const sortedChats = React.useMemo(() => sortBy((chat) => -chat.updatedAt, chatsMeta), [chatsMeta]);

    return (
        <ChatList
            items={sortedChats}
            renderItemIcon={(id) => (
                <ChatIconPresenter
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
                    id={id as ChatID}
                    selected={id === selectedChatID}
                />
            )}
            newItemName="New chat"
            selected={selectedChatID}
            onItemClick={(id) => {
                Router.push("BotChat", { botName, chatID: id });
            }}
            onItemAdd={onAddChatClick}
            onItemRemove={onRemoveChatClick}
        />
    );
};

const ChatDetail = React.memo(({ botName, chatID }: ChatDetailProps) => {
    const addChat = useSetAtom(addChatAtom);
    const removeChat = useSetAtom(removeChatAtom);
    const restoreChat = useSetAtom(restoreChatAtom);
    const task = useAtomValue(chatCompletionTasksAtom)[chatID];
    const [chat, setChat] = useChat(chatID);
    const [removing, setRemoving] = React.useState(O.None<ChatID>());

    const isGenerating = task?.type === "sending" || task?.type === "replying";

    const generatingMessageID = O.fromNullable(task?.messageID);

    const onAddChatClick = React.useCallback(() => {
        void addChat(botName);
    }, [addChat, botName]);

    const onChatRemoveClick = React.useCallback(
        async (chatID: ChatID) => {
            await removeChat(botName, chatID);
            Router.replace("BotNewChat", { botName });
        },
        [botName, removeChat],
    );

    if (!chat) {
        return <Redirect to="/404" />;
    }

    return (
        <Layout
            asideHeader={botName}
            aside={
                <Aside
                    botName={botName}
                    selectedChatID={chatID}
                    onAddChatClick={onAddChatClick}
                    onRemoveChatClick={(id) => {
                        if (!isChatID(id)) {
                            return;
                        }
                        setRemoving(O.Some(id));
                    }}
                />
            }
            header={
                <TitleInput
                    id="chat-title"
                    value={chat.title}
                    placeholder="Untitled"
                    onChange={(ev) => {
                        void setChat(
                            produce((draft) => {
                                if (!draft) {
                                    return;
                                }
                                draft.title = ev.target.value;
                            }),
                        );
                    }}
                />
            }
        >
            <React.Suspense fallback={<LoadingOverlay visible />}>
                <Chat
                    id={chatID}
                    className={css.content}
                    data={chat}
                    isGenerating={isGenerating}
                    generatingMessageID={generatingMessageID}
                    generatingStatus={O.fromNullable(task?.type)}
                    renderMessage={(id: MessageID) => (
                        <ChatMessagePresenter botName={botName} id={id} chatID={chatID} />
                    )}
                />
            </React.Suspense>
            <div className={css.bottom}>
                <MessageEditorPresenter botName={botName} chatID={chatID} />
            </div>
            {!!chat.deleted && (
                <Overlay blur={0.5} opacity={0.25} center>
                    <Button
                        as="button"
                        className={clsx(tappable, "rounded-xl bg-red-500 p-2 text-white")}
                        onClick={() => restoreChat(botName, chatID)}
                    >
                        This chat has been deleted. Click to restore it.
                    </Button>
                </Overlay>
            )}
            <ConfirmDialog
                title="Remove chat"
                description="Are you sure you want to remove this chat?"
                confirmLabel="Remove"
                danger
                open={removing.isSome()}
                onClose={() => {
                    setRemoving(O.None());
                }}
                onConfirm={() => {
                    removing.map(async (id) => {
                        await onChatRemoveClick(id);
                        setRemoving(O.None());
                    });
                }}
            />
        </Layout>
    );
});

export default ChatDetail;
