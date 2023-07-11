import { keyframes, style } from "@vanilla-extract/css";

export const root = style({
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
});

export const loading = style({
    width: "100%",
    textAlign: "center",
    selectors: {
        "&::after": {
            display: "inline-block",
            whiteSpace: "pre",
            content: '"Loading   "',
            animation: `${keyframes({
                "0%": {
                    opacity: 0.7,
                    content: '"Loading   "',
                },
                "25%": {
                    opacity: 1,
                    content: '"Loading.  "',
                },
                "50%": {
                    opacity: 0.7,
                    content: '"Loading.. "',
                },
                "75%": {
                    opacity: 1,
                    content: '"Loading..."',
                },
            })} 0.5s linear infinite`,
        },
    },
});
