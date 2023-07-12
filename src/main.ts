import "@/styles/base.css";
import "@/styles/global.scss";
import "@/styles/overrides.scss";
import "./polyfill";

import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { navigatorDetector } from "typesafe-i18n/detectors";

import { installAutoBlur, installAutoTooltip } from "./helper";
import { detectLocale } from "./i18n/i18n-util";
import { loadLocale } from "./i18n/i18n-util.sync";
import App from "./pages/App";

const main = () => {
    const locale = detectLocale(navigatorDetector);

    loadLocale(locale);

    const el = document.querySelector<HTMLDivElement>("#root");

    if (!el) {
        throw new Error("Element #root not found");
    }

    const root = createRoot(el);

    root.render(createElement(App, { locale }));

    requestAnimationFrame(() => {
        installAutoBlur();
        installAutoTooltip();
    });
};

main();
