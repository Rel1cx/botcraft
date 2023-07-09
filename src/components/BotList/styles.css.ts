import { style } from "@vanilla-extract/css";

import { floatingBox, tappable } from "@/theme/base.css";
import { vars } from "@/theme/vars.css";

export const root = style({
    height: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    gap: "1rem",
});

export const plus = style([
    tappable,
    floatingBox,
    {
        width: "44px",
        height: "44px",
        borderRadius: "0.5rem",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: vars.colors.overlay,
    },
]);
