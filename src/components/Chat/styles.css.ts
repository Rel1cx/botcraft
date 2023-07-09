import { style } from "@vanilla-extract/css";

export const root = style({
    flex: "1 1 auto",
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "stretch",
    width: "100%",
    overflowX: "hidden",
    overflowY: "auto",
});

export const content = style({
    padding: "0 1rem",
});

export const intro = style({});

export const message = style({});
