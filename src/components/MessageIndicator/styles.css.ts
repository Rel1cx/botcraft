import { keyframes, style } from "@vanilla-extract/css";

import { tappable } from "@/theme/base.css";
import { vars } from "@/theme/vars.css";

export const root = style([
    tappable,
    {
        width: "fit-content",
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
    padding: "0.5rem",
    minWidth: "4rem",
    color: vars.colors.black70,
    fontSize: "14px",
    fontWeight: 500,
    fontFamily: vars.font.family.fontFamilyUI,
});

export const connecting = style({
    selectors: {
        "&::after": {
            display: "inline-block",
            content: "Connecting   ",
            whiteSpace: "pre",
            animation: `${keyframes({
                "0%": {
                    opacity: 0.7,
                    content: "Connecting   ",
                },
                "25%": {
                    opacity: 1,
                    content: "Connecting.  ",
                },
                "50%": {
                    opacity: 0.7,
                    content: "Connecting.. ",
                },
                "75%": {
                    opacity: 1,
                    content: "Connecting...",
                },
            })} 1s linear infinite`,
        },
    },
});

export const generating = style({
    selectors: {
        "&::after": {
            display: "inline-block",
            content: "Generating   ",
            whiteSpace: "pre",
            animation: `${keyframes({
                "0%": { content: "Generating   " },
                "25%": { content: "Generating.  " },
                "50%": { content: "Generating.. " },
                "75%": { content: "Generating..." },
            })} 1s linear infinite`,
        },
    },
});

export const dotConnecting = style({
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

export const dotGenerating = style({
    height: "0.5rem",
    width: "0.5rem",
    borderRadius: "50%",
    backgroundColor: vars.colors.secondary,

    selectors: {
        "&:nth-child(1)": {
            animation: `${keyframes({
                "0%": { opacity: 0.2, transform: "scale(1)" },
                "50%": { opacity: 1, transform: "scale(1.25)" },
                "100%": { opacity: 0.2, transform: "scale(1)" },
            })} 1s linear infinite`,
        },
        "&:nth-child(2)": {
            animation: `${keyframes({
                "0%": { opacity: 0.5, transform: "scale(1)" },
                "50%": { opacity: 1, transform: "scale(1.25)" },
                "100%": { opacity: 0.5, transform: "scale(1)" },
            })} 1s linear 0.33s infinite`,
        },
        "&:nth-child(3)": {
            animation: `${keyframes({
                "0%": { opacity: 0.5, transform: "scale(1)" },
                "50%": { opacity: 1, transform: "scale(1.25)" },
                "100%": { opacity: 0.5, transform: "scale(1)" },
            })} 1s linear 0.66s infinite`,
        },
    },
});
