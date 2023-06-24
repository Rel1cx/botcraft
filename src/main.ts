/* eslint-disable no-console */
import "@/styles/base.css"
import "@/styles/global.css"
import "@/styles/overrides.css"

import { enableMapSet } from "immer"
import { createElement } from "react"
import { createRoot } from "react-dom/client"
import { navigatorDetector } from "typesafe-i18n/detectors"

import { detectLocale } from "./i18n/i18n-util"
import { loadLocale } from "./i18n/i18n-util.sync"
import { autoBlur } from "./lib/browser"
import App from "./pages/App"
import { suspendBeforeDbInit } from "./stores"

enableMapSet()

const main = async () => {
    const locale = detectLocale(navigatorDetector)

    loadLocale(locale)

    console.time("db init")
    await suspendBeforeDbInit()
    console.timeEnd("db init")

    const el = document.querySelector("#root")

    if (!el) {
        throw new Error("Element #root not found")
    }

    const root = createRoot(el)

    root.render(createElement(App, { locale }))

    autoBlur(document)
}

void main()
