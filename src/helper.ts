import { bind, bindAll, type UnbindFn } from "bind-event-listener";
import { match } from "ts-pattern";

import { blurActiveElement } from "./lib/browser";
import { noop } from "./lib/utils";

export const installAutoBlur = (target: HTMLElement | Window = window): UnbindFn => {
    return bind(target, {
        type: "keydown",
        listener: (event) => {
            match(event)
                .with({ key: "Escape" }, (ev) => {
                    ev.preventDefault();
                    blurActiveElement();
                })
                .otherwise(noop);
        },
    });
};

export const installAutoTooltip = (target: HTMLElement | Window = window): UnbindFn => {
    return bindAll(target, [
        {
            type: "keydown",
            listener: (event) => {
                match(event)
                    .with({ key: "Alt" }, () => {
                        document.documentElement.style.setProperty("--tooltip-opacity", "1");
                    })
                    .otherwise(noop);
            },
        },
        {
            type: "keyup",
            listener: (event) => {
                match(event)
                    .with({ key: "Alt" }, () => {
                        document.documentElement.style.setProperty("--tooltip-opacity", "0");
                    })
                    .otherwise(noop);
            },
        },
    ]);
};
