import { style } from "@vanilla-extract/css";

import { tappable } from "@/theme/base.css";
import { vars } from "@/theme/vars.css";

export const root = style({
    paddingTop: "5rem",
    paddingBottom: "5rem",
});

export const label = style({
    textAlign: "center",
    fontWeight: 900,
    fontSize: "13rem",
    lineHeight: 1,
    marginBottom: "2.25rem",
    color: vars.colors.black20,
});

export const title = style({
    textAlign: "center",
    fontWeight: 900,
    fontSize: "2.375rem",
});

export const description = style({
    maxWidth: "31.25rem",
    margin: "auto",
    marginTop: "2.25rem",
    marginBottom: "3.375rem",
});

export const button = style([
    tappable,
    {
        padding: "0.5rem 1.5rem",
        margin: "auto",
        borderRadius: "0.5rem",
        color: vars.colors.white,
        backgroundColor: vars.colors.primary,
    },
]);
