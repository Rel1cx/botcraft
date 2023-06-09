import { useResizeObserver } from "@react-hookz/web";
import clsx from "clsx";
import { AnimatePresence, m } from "framer-motion";
import * as React from "react";

import type { MessageData } from "@/bot/types";
import type { ChatItem } from "@/types";
import type { ChatID, MessageID } from "@/zod/id";
import { makeMessageID } from "@/zod/id";

import * as css from "./styles.css";

const Message = React.lazy(() => import("@/components/Message/Message"));

const Animation = React.lazy(() => import("@/components/atoms/Animation/Animation"));

export type MessageComponentProps = {
    chatID: ChatID;
    id: MessageID;
    className?: string;
};

export type ChatProps = {
    data: ChatItem;
    autoScrollEnabled?: boolean;
    renderMessage?: (id: MessageID) => React.ReactNode;
    renderIndicator?: (id: MessageID) => React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const Chat = ({ className, data, autoScrollEnabled = false, renderMessage, renderIndicator, ...rest }: ChatProps) => {
    const { id: chatID, intro, messages } = data;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);

    const introMessage = React.useMemo<MessageData>(
        () => ({
            id: makeMessageID(),
            role: "assistant",
            content: intro,
            updatedAt: Date.now(),
        }),
        [intro],
    );

    useResizeObserver(
        contentRef,
        (entry) => {
            const root = rootRef.current;

            if (!root) {
                return;
            }

            const atBottomOffset = 300;

            const { clientHeight, scrollHeight, scrollTop } = root;

            const isAtBottom = scrollTop + clientHeight >= scrollHeight - atBottomOffset;

            if (!isAtBottom) {
                return;
            }

            const { height } = entry.contentRect;

            root.scrollTo({
                top: height,
            });
        },
        autoScrollEnabled,
    );

    return (
        <div ref={rootRef} className={clsx(css.root, className)} {...rest}>
            <div className={css.content} ref={contentRef}>
                <Animation>
                    <m.div key={chatID} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Message className={css.intro} data={introMessage} showMenu={false} />
                    </m.div>
                    <AnimatePresence>
                        {messages.map((id) => (
                            <m.div key={id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {renderMessage?.(id)}
                                {renderIndicator?.(id)}
                            </m.div>
                        ))}
                    </AnimatePresence>
                </Animation>
            </div>
        </div>
    );
};

export default Chat;
