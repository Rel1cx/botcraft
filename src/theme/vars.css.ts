import { createGlobalTheme, createVar } from "@vanilla-extract/css"

export const desktopBreakpoint = createVar()
export const lineHeightRelaxed = createVar()

export const vars = createGlobalTheme(":root", {
    desktopBreakpoint: "768px",
    contentWidth: "1024px",
    floatingContentWidth: "calc(100% - 2rem)",
    colors: {
        white: "#fff",
        black: "#1a1a1a",
        black20: "#cccccc",
        black30: "#b3b3b3",
        black40: "#999999",
        black50: "#808080",
        black70: "#4d4d4d",
        coral: "#ff6b61",
        coralDark: "#d95047",
        coralLight: "#fbd7d9",
        gold: "#ba8b37",
        goldDark: "#a57114",
        goldLight: "#fcdea9",
        green: "#5dc98f",
        greenDark: "#4f6765",
        greenLight: "#b9cfcd",
        lightGray: "#f2f2f2",
        purple: "#7163b8",
        purpleDark: "#615989",
        purpleLight: "#b6b1d3",
        teal: "#3dbdd8",
        tealDark: "#45748e",
        tealLight: "#a1d5df",
        primary: "#1c345d",
        secondary: "#3dbdd8",
        hover: "rgba(0, 0, 0, 0.05)",
        overlay: "#00000015",
        selected: "#2563eb",
        text: "#1a1a1a",
        border: "#cccccc",
        warn: "#ff6b61",
        warnDark: "#d95047",
        warnLight: "#fbd7d9",
        success: "#5dc98f",
        successDark: "#4f6765",
        successLight: "#b9cfcd",
        transparent: "transparent",
    },
    spacing: {
        spacingPx: "1px",
        spacing0: "0",
        spacing1: "0.25rem",
        spacing2: "0.5rem",
        spacing3: "0.75rem",
        spacing4: "1rem",
        spacing5: "1.25rem",
        spacing6: "1.5rem",
        spacing8: "2.0rem",
        spacing12: "3.0rem",
    },
    font: {
        family: {
            fontFamilyBody: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
        'Segoe UI Symbol', 'Noto Color Emoji'`,
            // fontFamilyHeading: 'Source Serif Pro'
        },
        size: {
            fontSizeRoot: "16px",
            fontSize0: "0.8rem",
            fontSize1: "1rem",
            fontSize2: "1.25rem",
            fontSize3: "1.563rem",
            fontSize4: "1.953rem",
            fontSize5: "2.441rem",
            fontSize6: "3.052rem",
            fontSize7: "3.815rem",
        },
        weight: {
            fontWeightBold: "700",
            fontWeightBlack: "900",
        },
    },
    timing: {
        transitionDuration: "120ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
})
