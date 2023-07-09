import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "@/theme/vars.css";

export const root = style({
    display: "flex",
    borderRadius: "0.5rem",
    overflow: "hidden",
});

export const content = style({
    flex: "1 1 auto",
});

globalStyle(`${content} .cm-editor .cm-scroller`, {
    maxHeight: "320px",
    fontFamily: `${vars.font.family.fontFamilyBody}`,
});
