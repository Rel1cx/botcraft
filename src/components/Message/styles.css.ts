import { style, styleVariants } from "@vanilla-extract/css"

import { tappable } from "@/theme/base.css"
import { vars } from "@/theme/vars.css"

export const baseRoot = style({
    margin: "1rem 0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    ":hover": {
        vars: {
            "--tooltip-opacity": "1",
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
            color: vars.colors.text,
            background: vars.colors.lightGray,

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
            color: vars.colors.white,
            background: vars.colors.tealDark,
        },
    ],
    assistant: [
        baseContent,
        {
            color: vars.colors.text,
            background: vars.colors.lightGray,
        },
    ],
})

export const actionButton = style([
    tappable,
    {
        position: "sticky",
        top: "1rem",
        bottom: "1rem",
        width: "40px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9999px",
        opacity: "var(--tooltip-opacity)",
        transition: "all 120ms ease-in-out",

        ":hover": {
            background: vars.colors.lightGray,
        },
    },
])
