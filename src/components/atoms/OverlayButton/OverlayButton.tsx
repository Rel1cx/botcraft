import { Button } from "@ariakit/react";
import { Overlay } from "@mantine/core";
import clsx from "clsx";
import * as React from "react";

import { tappable } from "@/theme/base.css";

type OverlayButtonProps = React.PropsWithChildren<{
    onClick?: () => void;
}>;

const OverlayButton = React.memo(({ children, onClick }: OverlayButtonProps) => {
    return (
        <Overlay blur={0.5} opacity={0.25} center>
            <Button as="button" className={clsx(tappable, "rounded-xl bg-red-500 p-2 text-white")} onClick={onClick}>
                {children}
            </Button>
        </Overlay>
    );
});

export default OverlayButton;
