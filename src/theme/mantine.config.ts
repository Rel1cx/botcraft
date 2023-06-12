import { type MantineThemeOverride } from "@mantine/core"

import { vars } from "./vars.css"

export const colors = {
    blue: [
        "#2563eb",
        "#1d4ed8",
        "#1e40af",
        "#1e3a8a",
        "#1e3a8a",
        "#1c345d",
        "#1c345d",
        "#1c345d",
        "#1c345d",
        "#1c345d",
    ],
} satisfies MantineThemeOverride["colors"]

export const mantineTheme: MantineThemeOverride = {
    fontFamily: vars.font.family.fontFamilyBody,
    colors,
    primaryColor: "blue",
    primaryShade: 0,
    radius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
    },
}
