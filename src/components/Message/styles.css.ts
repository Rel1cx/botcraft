import { style, styleVariants } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const baseRoot = style({
    margin: "1rem 0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    vars: {
        "--action-button-opacity": "0",
    },

    ":hover": {
        vars: {
            "--action-button-opacity": "1",
        },
    },
})

export const baseContent = style({
    padding: "0.5rem 1rem",
    maxWidth: "75%",
    overflow: "hidden",
    background: vars.colors.lightGray,
    borderRadius: "1rem",
})

export const root = styleVariants({
    system: [baseRoot, { justifyContent: "center" }],
    user: [baseRoot, { flexDirection: "row-reverse" }],
    assistant: [baseRoot, { flexDirection: "row" }],
})

export const content = styleVariants({
    system: [
        baseContent,
        {
            background: vars.colors.lightGray,
            color: vars.colors.text,

            "@media": {
                "screen and (max-width: 768px)": {
                    maxWidth: "100%",
                },
            },
        },
    ],
    user: [
        baseContent,
        {
            background: vars.colors.primary,
            color: vars.colors.white,
        },
    ],
    assistant: [
        baseContent,
        {
            background: vars.colors.lightGray,
            color: vars.colors.text,
        },
    ],
})

export const actionButton = style({
    position: "sticky",
    top: "1rem",
    bottom: "1rem",
    width: "40px",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "9999px",
    opacity: "var(--action-button-opacity)",
    transition: "all 120ms ease-in-out",

    ":hover": {
        background: vars.colors.lightGray,
    },

    ":active": {
        filter: "brightness(0.9)",
    },
})
