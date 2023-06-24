import { style } from "@vanilla-extract/css"

export const root = style({
    width: "100%",
    maxWidth: "75%",
    display: "flex",
    justifyContent: "center",
})

export const input = style({
    textAlign: "center",
    textTransform: "capitalize",
    width: "100%",
    height: "100%",
    outline: "none",
    boxShadow: "none",
    borderColor: "transparent",

    ":focus": {
        outline: "none",
        boxShadow: "none",
        borderColor: "transparent",
    },
})
