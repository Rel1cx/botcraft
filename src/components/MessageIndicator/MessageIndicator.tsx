import { m } from "framer-motion";
import * as React from "react";
import { match } from "ts-pattern";

import * as css from "./styles.css";

const Animation = React.lazy(() => import("@/components/atoms/Animation/Animation"));

type MessageIndicatorProps = {
    status: "sending" | "sent" | "failed";
    onClick?: () => void;
};

const MessageIndicator = React.memo(({ status, onClick }: MessageIndicatorProps) => {
    return (
        <Animation>
            <m.div className={css.root} onClick={onClick} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                {match(status)
                    .with("sending", () => (
                        <div className={css.sending}>
                            <div className={css.dot} />
                            <div className={css.dot} />
                            <div className={css.dot} />
                        </div>
                    ))
                    .with("sent", () => null)
                    .with("failed", () => <div className={css.failed}>[!]</div>)
                    .exhaustive()}
            </m.div>
        </Animation>
    );
});

export default MessageIndicator;
