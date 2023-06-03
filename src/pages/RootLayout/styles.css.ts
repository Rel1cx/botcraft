import { style } from "@vanilla-extract/css"

import { vars } from "@/theme/vars.css"

export const container = style({
    height: "100%",
    display: "flex",
    backgroundColor: "#fff",
})

export const main = style({
    flex: "1 1 auto",
    height: "100%",
})

export const navContainer = style({
    flexShrink: 0,
    width: "68px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRight: `1px solid ${vars.colors.overlay}`,

    "@media": {
        "screen and (max-width: 768px)": {
            display: "none",
        },
    },
})

export const navHeader = style({
    flexShrink: 0,
    width: "100%",
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: `1px solid ${vars.colors.overlay}`,
})

export const navContent = style({
    flex: "1 1 auto",
    padding: "12px 0",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
})

export const navFooter = style({
    width: "100%",
    height: "44px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})
