import * as React from "react";

import { useConst } from "@/lib/hooks/use-const";

import * as css from "./styles.css";

type TitleInputProps = {
    id?: string;
    value?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TitleInput = React.memo(({ id, onChange, placeholder = "Untitled", value, ...rest }: TitleInputProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const defaultValue = useConst(value);
    const deferredValue = React.useDeferredValue(value);

    React.useInsertionEffect(() => {
        const input = inputRef.current;

        if (!input || document.activeElement === input) {
            return;
        }

        input.value = deferredValue ?? "";
    }, [deferredValue]);

    return (
        <div id={id} className={css.root}>
            <input
                ref={inputRef}
                className={css.input}
                type="text"
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                translate="no"
                spellCheck="false"
                autoCorrect="off"
                autoComplete="off"
                aria-autocomplete="none"
                {...rest}
            />
        </div>
    );
});

export default TitleInput;
