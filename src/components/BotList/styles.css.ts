import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    height: "100%",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    gap: "1rem",
})

export const plus = style({
    width: "44px",
    height: "44px",
    borderRadius: "0.5rem",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: vars.colors.overlay,
    outline: `1.5px dashed ${vars.colors.overlay}`,
    transition: "filter 120ms ease-out",

    ":hover": {
        filter: "brightness(0.96)",
    },

    ":active": {
        filter: "brightness(0.94)",
    },
})
