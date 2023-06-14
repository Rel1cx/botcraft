import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const button = style({
    display: "flex",
    height: "2.5rem",
    touchAction: "none",
    userSelect: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    whiteSpace: "nowrap",
    borderRadius: "0.5rem",
    borderStyle: "none",
    backgroundColor: "hsl(204 100% 40%)",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "hsl(204 20% 100%)",
    textDecorationLine: "none",

    ":hover": {
        backgroundColor: "hsl(204 100% 32%)",
    },

    ":focus-visible": {
        outline: "2px solid hsl(204 100% 40%)",
        outlineOffset: "2px",
    },

    "@media": {
        "(min-width: 640px)": {
            gap: "0.5rem",
        },
    },
})

export const secondary = style({
    backgroundColor: "transparent",
    color: "currentColor",

    ":hover": {
        backgroundColor: "hsl(204 10% 10% / 0.05)",
    },
})

export const danger = style({
    backgroundColor: "hsl(357 56% 50%)",

    ":hover": {
        backgroundColor: "hsl(357 56% 42%)",
    },
})

export const backdrop = style({
    backgroundColor: "hsl(204 10% 10% / 0.1)",
    backdropFilter: "blur(3px)",
})

export const dialog = style({
    position: "fixed",
    inset: "0.75rem",
    padding: "1rem",
    overflow: "auto",
    maxHeight: "calc(100vh - 2 * 0.75rem)",
    margin: "auto",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    color: "hsl(204 10% 10%)",
    borderRadius: "0.75rem",
    backgroundColor: vars.colors.lightGray,
    outline: `2px solid ${vars.colors.overlay}`,
    zIndex: 1000,

    "@media": {
        "(min-width: 640px)": {
            top: "10vh",
            bottom: "10vh",
            maxHeight: "80vh",
            width: "420px",
            borderRadius: "1rem",
            padding: "1.5rem",
        },
    },
})

export const heading = style({
    margin: "0px",
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
    fontWeight: 600,
})

export const dismiss = style({
    height: "2.5rem",
    width: "2.5rem",
    padding: "0px",
})

export const buttons = style({
    display: "flex",
    gap: "0.5rem",
})

export const header = style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
})
