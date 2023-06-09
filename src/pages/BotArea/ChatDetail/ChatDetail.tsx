import { LoadingOverlay } from "@mantine/core";
import { Chat as ChatIcon, ChatDots } from "@phosphor-icons/react";
import { Option as O } from "@swan-io/boxed";
import { produce } from "immer";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useTransientAtom } from "jotai-game";
import { F, sortBy, T } from "rambda";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import invariant from "tiny-invariant";
import { match, P } from "ts-pattern";

import type { MessageData } from "@/bot";
import Icon from "@/components/atoms/Icon/Icon";
import OverlayButton from "@/components/atoms/OverlayButton/OverlayButton";
import Redirect from "@/components/atoms/Redirect/Redirect";
import TitleInput from "@/components/atoms/TitleInput/TitleInput";
import Chat from "@/components/Chat/Chat";
import ChatList from "@/components/ChatList/ChatList";
import MessageEditor from "@/components/MessageEditor/MessageEditor";
import MessageIndicator from "@/components/MessageIndicator/MessageIndicator";
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
import { chatsDb, draftsDb, messagesDb } from "@/stores/db";
import { vars } from "@/theme/vars.css";
import { type ChatID, isChatID, makeMessageID, type MessageID } from "@/zod/id";

import { Layout } from "../Layout/Layout";
import * as css from "./styles.css";

const Message = React.lazy(() => import("@/components/Message/Message"));
const ConfirmDialog = React.lazy(() => import("@/components/atoms/ConfirmDialog/ConfirmDialog"));

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
    const [getTasks] = useTransientAtom(chatCompletionTasksAtom);

    const handleRemoveClick = React.useCallback(() => {
        void removeMessage(chatID, id);
    }, [chatID, id, removeMessage]);

    const handleRegenerateClick = React.useCallback(() => {
        const shouldSkip = match(getTasks()[chatID])
            .with({ abort: P.instanceOf(Function) }, T)
            .otherwise(F);

        if (shouldSkip) {
            return;
        }

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
    }, [botName, chatID, data, getTasks, id, setDraft, updateChatCompletion]);

    return (
        <React.Suspense fallback={<LoadingOverlay visible />}>
            {React.useMemo(
                () =>
                    match(data)
                        .with(P.nullish, () => null)
                        .with({ role: "system" }, () => null)
                        .otherwise((data) => {
                            return (
                                <Message
                                    id={id}
                                    data={data}
                                    onRemoveClick={handleRemoveClick}
                                    onRegenerateClick={handleRegenerateClick}
                                />
                            );
                        }),
                [id, data, handleRegenerateClick, handleRemoveClick],
            )}
        </React.Suspense>
    );
});

const MessageEditorPresenter = React.memo(({ botName, chatID }: MessageEditorPresenterProps) => {
    const messageEditorRef = React.useRef<HTMLInputElement>(null);
    const deleteDraft = useSetAtom(draftsDb.delete);
    const addMessage = useSetAtom(addMessageAtom);
    const setMessage = useSetAtom(messagesDb.set);
    const requestChatCompletion = useSetAtom(updateChatCompletionAtom);
    const task = useAtomValue(chatCompletionTasksAtom)[chatID];
    const [getChat] = useTransientAtom(chatsDb.item(chatID));
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

                    const isLastMessage = [...(getChat()?.messages ?? [])].pop() === messageID;

                    if (isLastMessage) {
                        await requestChatCompletion(botName, chatID);
                    }
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
            renderItemIcon={(id) => <ChatIconPresenter id={id as ChatID} selected={id === selectedChatID} />}
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

    const generatingMessageID = O.fromNullable(task?.messageID);

    const isChatGenerating = task?.type === "sending" || task?.type === "replying";

    const onAddChatClick = React.useCallback(() => addChat(botName), [addChat, botName]);

    const onChatRemoveClick = React.useCallback(
        async (chatID: ChatID) => {
            await removeChat(botName, chatID, async (isLastChat) => {
                if (isLastChat) {
                    await addChat(botName);
                }
                Router.replace("BotNewChat", { botName });
            });
        },
        [addChat, botName, removeChat],
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
            <Chat
                id={chatID}
                className={css.content}
                data={chat}
                autoScrollEnabled={isChatGenerating}
                renderMessage={(id: MessageID) => <ChatMessagePresenter botName={botName} id={id} chatID={chatID} />}
                renderIndicator={(id: MessageID) => {
                    if (!task || generatingMessageID.toNull() !== id) {
                        return null;
                    }

                    return (
                        <MessageIndicator
                            status={task.type}
                            onClick={() => {
                                match(task)
                                    .with({ abort: P.instanceOf(Function) }, ({ abort }) => {
                                        abort();
                                        // TODO: implement feedback for aborting
                                    })
                                    // TODO: implement rest of the cases
                                    .run();
                            }}
                        />
                    );
                }}
            />
            <div className={css.bottom}>
                <MessageEditorPresenter botName={botName} chatID={chatID} />
            </div>
            {!!chat.deleted && (
                <OverlayButton onClick={() => restoreChat(botName, chatID)}>
                    This chat has been deleted. Click to restore it.
                </OverlayButton>
            )}
            <React.Suspense>
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
            </React.Suspense>
        </Layout>
    );
});

export default ChatDetail;
