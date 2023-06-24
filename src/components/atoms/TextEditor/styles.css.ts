import { globalStyle, style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const root = style({
    display: "flex",
    fontSize: "16px",
    borderRadius: "0.5rem",
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

globalStyle(`${content} .cm-editor .cm-scroller`, {
    fontFamily: `${vars.font.family.fontFamilyBody}`,
})
