import { globalStyle, style, styleVariants } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const baseRoot = style({
    margin: "1rem 0",
    display: "flex",
    width: "100%",
})

export const baseContent = style({
    padding: "0.5rem 1rem",
    maxWidth: "75%",
    lineHeight: "1.5",
    wordBreak: "break-word",
    overflow: "hidden",
    background: vars.colors.lightGray,
    borderRadius: "1rem",
})

export const root = styleVariants({
    system: [baseRoot, { justifyContent: "center" }],
    user: [baseRoot, { justifyContent: "flex-end" }],
    assistant: [baseRoot, { justifyContent: "flex-start" }],
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

globalStyle(`${baseContent} pre`, {
    backgroundColor: "#2e3440",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1rem",
    fontFamily: "iosevka, monospace",
})

globalStyle(`${baseContent} code.hljs`, {
    padding: 0,
})

globalStyle(`${baseContent} ol`, {
    listStyle: "decimal",
})

globalStyle(`${baseContent} ul`, {
    listStyle: "disc",
})
