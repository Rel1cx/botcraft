import { keyframes, style } from "@vanilla-extract/css";

import { tappable } from "@/theme/base.css";
import { vars } from "@/theme/vars.css";

export const root = style([
    tappable,
    {
        width: "4rem",
        height: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "1rem",
        backgroundColor: vars.colors.lightGray,
    },
]);

export const content = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
});

export const dot = style({
    height: "0.5rem",
    width: "0.5rem",
    borderRadius: "50%",
    backgroundColor: vars.colors.secondary,

    selectors: {
        "&:nth-child(1)": {
            animation: `${keyframes({
                "0%": { opacity: 1 },
                "100%": { opacity: 0 },
            })} 1s linear infinite`,
        },
        "&:nth-child(2)": {
            animation: `${keyframes({
                "0%": { opacity: 1 },
                "100%": { opacity: 0 },
            })} 1s linear 0.33s infinite`,
        },
        "&:nth-child(3)": {
            animation: `${keyframes({
                "0%": { opacity: 1 },
                "100%": { opacity: 0 },
            })} 1s linear 0.66s infinite`,
        },
    },
});
