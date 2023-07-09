import { style } from "@vanilla-extract/css";

import { floatingBox } from "@/theme/base.css";

export const root = style([
    floatingBox,
    {
        backgroundColor: "hsla(0, 0%, 100%, 0.8)",
        backdropFilter: "blur(16px)",
        border: "none",
    },
]);
