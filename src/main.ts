import "@/styles/base.css"
import "@/styles/global.css"
import "@/styles/overrides.css"

import { enableMapSet, setAutoFreeze, setUseStrictShallowCopy } from "immer"
import { createElement } from "react"
import { createRoot } from "react-dom/client"
import { navigatorDetector } from "typesafe-i18n/detectors"

import { detectLocale } from "./i18n/i18n-util"
import { loadLocaleAsync } from "./i18n/i18n-util.async"
import { autoBlur, waitDOMContentLoaded } from "./lib/browser"
import App from "./pages/App"
import { loadConfigToAtom, loadDBToAtom } from "./stores"

enableMapSet()
setAutoFreeze(true)
setUseStrictShallowCopy(true)

const main = async () => {
    const locale = detectLocale(navigatorDetector)

    await loadLocaleAsync(locale)

    await loadConfigToAtom()

    await loadDBToAtom()

    const el = document.querySelector("#root")

    if (!el) {
        throw new Error("Element #root not found")
    }

    const root = createRoot(el)

    root.render(createElement(App, { locale }))

    autoBlur(document)
}

void main()
