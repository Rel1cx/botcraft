import * as React from "react";

export const useConst = <T>(initialValue: T | (() => T)): T => {
    const ref = React.useRef<{ value: T }>();

    if (ref.current === undefined) {
        ref.current = {
            value: typeof initialValue === "function" ? (initialValue as () => T)() : initialValue,
        };
    }
    return ref.current.value;
};
