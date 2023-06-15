import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const content = style({
    width: "100%",
    height: "100%",
    padding: "0.5rem 1rem",
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

export const textarea = style({})
