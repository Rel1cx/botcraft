import { globalStyle, style } from "@vanilla-extract/css";

export const root = style({
    lineHeight: "1.5",
    wordBreak: "break-word",
});

globalStyle(`${root} pre`, {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    backgroundColor: "#2e3440",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    fontSize: "1rem",
    fontFamily: "iosevka, monospace",
});

globalStyle(`${root} code.hljs`, {
    padding: 0,
});

globalStyle(`${root} ol`, {
    listStyle: "decimal",
});

globalStyle(`${root} ul`, {
    listStyle: "disc",
});
