import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const asideContent = style({
    padding: "0.25rem 0",
    width: "100%",
    height: "100%",
    overflowY: "auto",
})

export const title = style({
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    fontWeight: "normal",
    color: vars.colors.black,
    textTransform: "uppercase",
})

export const section = style({
    padding: "0 1rem",
    paddingBottom: "0.5rem",
    display: "flex",
    flexFlow: "column nowrap",
    gap: "1rem",
})

export const asideHeader = style({
    padding: "1rem",
    width: "100%",
    height: "100%",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
})

export const button = style({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "0.5rem",
    backgroundColor: vars.colors.lightGray,
    transition: "filter 120ms ease-out",

    ":hover": {
        filter: "brightness(0.9)",
    },
})

export const textarea = style({
    padding: "0.25rem 0.5rem",
    fontSize: "14px",
    borderRadius: "0.5rem",
    border: `1px solid ${vars.colors.black20}`,
    transition: "border 120ms ease-out",

    ":focus-within": {
        border: `1px solid ${vars.colors.black40}`,
    },
})

export const content = style({
    padding: "0 1rem",
})
