import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const root = style({
    backgroundColor: "hsla(0, 0%, 100%, 0.8)",
    backdropFilter: "blur(16px)",
    border: "none",
    outline: `2px solid ${vars.colors.overlay}`,
})
