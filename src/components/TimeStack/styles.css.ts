import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    height: "100%",
    width: "100%",
    padding: "12px 2px",
    overflowY: "auto",
})

export const item = style({
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
    cursor: "pointer",
    borderRadius: "0.25rem",
    background: vars.colors.background,
    transition: "filter 100ms ease-out",
    selectors: {
        "&[data-selected='true']": {
            color: "#fff",
            background: vars.colors.primary,
        },
        "&:hover": {
            filter: "brightness(0.9)",
        },
    },
})

export const newChatButton = style({
    padding: "0 0.5rem",
    width: "100%",
    height: "38px",
    display: "flex",
    flexFlow: "row nowrap",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    color: vars.colors.secondary,
    border: `1px solid ${vars.colors.secondary}`,
    borderRadius: "0.25rem",
    transition: "background 100ms ease-out",

    ":hover": {
        background: vars.colors.hover,
    },

    ":active": {
        background: vars.colors.overlay,
    },

    ":disabled": {
        filter: "opacity(0.5)",
        cursor: "not-allowed",
    },
})

export const sectionTitle = style({
    margin: "0",
    color: "#999",
    fontWeight: "400",
    fontSize: "12x",
    textTransform: "capitalize",
})
