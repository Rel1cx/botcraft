import { m } from "framer-motion";
import * as React from "react";
import { match } from "ts-pattern";

import type { ChatCompletionTask } from "@/types";

import * as css from "./styles.css";

const Animation = React.lazy(() => import("@/components/atoms/Animation/Animation"));

type MessageIndicatorProps = {
    status: ChatCompletionTask["type"];
    onClick?: () => void;
};

const MessageIndicator = React.memo(({ status, onClick }: MessageIndicatorProps) => {
    return (
        <Animation>
            <m.div className={css.root} onClick={onClick} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                {match(status)
                    .with("sending", () => (
                        <div className={css.content}>
                            <small className={css.connecting} />
                        </div>
                    ))
                    .with("replying", () => (
                        <div className={css.content}>
                            <div className={css.dot} />
                            <div className={css.dot} />
                            <div className={css.dot} />
                        </div>
                    ))
                    .otherwise(() => null)}
            </m.div>
        </Animation>
    );
});

export default MessageIndicator;
