import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    marginBottom: "1rem",
})

export const info = style({
    display: "flex",
    alignItems: "center",
    height: "1.25rem",
    padding: "0 14px",
    gap: "2rem",
    margin: "0.5rem 0",
    color: "#555",
    fontSize: "12px",
    borderRadius: "0.25rem",
    background: vars.colors.background,
    opacity: "0",
    transition: "opacity 100ms ease-out",
})

export const number = style({
    fontFamily: "iosevka, monospace",
})
