import { replaceUnsafe, useLocation } from "@swan-io/chicane";
import * as React from "react";

import { useConst } from "@/lib/hooks/use-const";

type RedirectProps = {
    to: string;
};

// Modified version of https://github.com/swan-io/chicane/blob/main/example/src/Redirect.tsx
const Redirect = React.memo<RedirectProps>(({ to }) => {
    const location = useLocation().toString();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const ref = useConst(() => (node: HTMLDivElement | null) => {
        if (!node || location === to) {
            return;
        }

        // eslint-disable-next-line no-console
        console.info(`Redirecting from [${location}] to [${to}]`);
        replaceUnsafe(to);
    });

    return <div ref={ref} className="hidden" />;
});

export default Redirect;
