import { globalStyle, style, styleVariants } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const baseContainer = style({
    margin: "1rem 0",
    display: "flex",
    width: "100%",
})

export const baseContent = style({
    padding: "0.5rem 1rem",
    borderRadius: "1rem",
    maxWidth: "80%",
    lineHeight: "1.5",
    overflow: "hidden",
    background: "#f1f2f2",
})

export const container = styleVariants({
    system: [baseContainer, { display: "none", justifyContent: "center" }],
    user: [baseContainer, { justifyContent: "flex-end" }],
    assistant: [baseContainer, { justifyContent: "flex-start" }],
})

export const content = styleVariants({
    system: [
        baseContent,
        {
            background: vars.colors.secondary,
            color: vars.colors.white,
            maxWidth: "80%",

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
            background: vars.colors.background,
            color: vars.colors.text,
        },
    ],
})

globalStyle(`${baseContent} pre`, {
    backgroundColor: "#2e3440",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1rem",
    fontFamily: "iosevka, 'Iosevka Web', monospace",
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
