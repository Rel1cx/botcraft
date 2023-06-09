import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    marginBottom: "1rem",
})

export const toolbar = style({
    display: "flex",
    alignItems: "center",
    height: "1.25rem",
    gap: "1rem",
    margin: "1rem 0",
    color: "#555",
    fontSize: "12px",
    opacity: "0",
    transition: "opacity 100ms ease-out",
})

export const info = style({
    display: "block",
    padding: "0.125rem 0.5rem",
    textAlign: "center",
    color: vars.colors.text,
    borderRadius: "0.25rem",
    background: vars.colors.background,
    fontFamily: "iosevka, monospace",
})
