import { style } from "@vanilla-extract/css"

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
