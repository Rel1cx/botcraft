import "@/styles/base.css"
import "@/styles/global.scss"
import "@/styles/overrides.scss"

import { Option as O } from "ftld"
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
setUseStrictShallowCopy(false)

const main = async () => {
    const locale = detectLocale(navigatorDetector)

    await loadLocaleAsync(locale)

    await loadConfigToAtom()

    await loadDBToAtom()

    O.from(document.querySelector("#root"))
        .result()
        .map(createRoot)
        .tap((root) => root.render(createElement(App, { locale })))
        // eslint-disable-next-line no-console
        .tapErr(console.error)

    autoBlur(document)

    await waitDOMContentLoaded()
    window.progress.end()
}

void main()
