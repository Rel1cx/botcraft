import { globalStyle, style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    display: "flex",
    fontSize: "16px",
    borderRadius: "0.5rem",
    backgroundColor: vars.colors.background,
    overflow: "hidden",

    "@media": {
        "screen and (max-width: 768px)": {
            fontSize: "14px",
        },
    },
})

export const content = style({
    flex: "1 1 auto",
})

globalStyle(`${content} .cm-editor`, {
    padding: "0.5rem",
    outline: "none",
    backgroundColor: "transparent",
    transition: "background-color 100ms ease-out",
})

globalStyle(`${content} .cm-editor.cm-focused`, {
    backgroundColor: vars.colors.background,
})

globalStyle(`${content} .cm-editor .cm-scroller`, {
    fontFamily: `${vars.font.family.fontFamilyBody}`,
})
