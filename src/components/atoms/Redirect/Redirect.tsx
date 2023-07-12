import { replaceUnsafe, useLocation } from "@swan-io/chicane";
import * as React from "react";

type RedirectProps = {
    to: string;
};

// Modified version of https://github.com/swan-io/chicane/blob/main/example/src/Redirect.tsx
const Redirect = React.memo<RedirectProps>(
    ({ to }) => {
        const location = useLocation().toString();

        const ref = React.useCallback(
            (node: HTMLDivElement | null) => {
                if (!node || location === to) {
                    return;
                }

                // eslint-disable-next-line no-console
                console.log(`Redirecting from [${location}] to [${to}]`);
                replaceUnsafe(to);
            },
            [location, to],
        );

        return <div ref={ref} className="hidden" />;
    },
    () => false,
);

export default Redirect;
