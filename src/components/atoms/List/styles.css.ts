import { globalStyle, style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
})

export const content = style({
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
    padding: "0 0.5rem",
})

export const itemList = style({
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
    width: "100%",
})

export const item = style({
    padding: "0 0.5rem",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "38px",
    fontSize: "14px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    background: "#fff",
    borderRadius: "0.25rem",
    cursor: "pointer",
})

globalStyle(`${itemList} [data-selected='true']`, {
    color: "#fff",
    background: vars.colors.primary,
})
