import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const root = style({
    height: "100%",
    display: "flex",
    background: "#fff",
})

export const main = style({
    flex: "1 1 auto",
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
})

export const aside = style({
    width: "240px",
    height: "100%",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${vars.colors.border}`,

    "@media": {
        "screen and (max-width: 768px)": {
            display: "none",
        },
    },
})

export const header = style({
    height: "44px",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `1px solid ${vars.colors.border}`,
})

export const asideHeader = style([header, {}])
