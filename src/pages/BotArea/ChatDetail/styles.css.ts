import { style } from "@vanilla-extract/css"

export const content = style({
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    overflowY: "auto",
    backgroundColor: "white",
})

export const bottom = style({
    position: "sticky",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "1rem",
    marginBottom: "0",
})
