import { style } from "@vanilla-extract/css"

import { vars } from "./vars.css"

export const tappable = style({
    cursor: "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "filter 120ms ease-out",

    ":hover": {
        filter: "brightness(0.94)",
    },

    ":active": {
        filter: "brightness(0.88)",
    },
})

export const floatingBox = style({
    outline: `1.5px solid ${vars.colors.overlay}`,
})
