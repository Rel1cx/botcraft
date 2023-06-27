import { bind } from "bind-event-listener"
import { parse, stringify } from "telejson"
import { match } from "ts-pattern"

export const isMobile = () => window.location.href.includes("/mobile/")

export const waitDOMContentLoaded = () => {
    return new Promise((resolve) => {
        match(document.readyState)
            .with("interactive", resolve)
            .with("complete", resolve)
            .otherwise(() => {
                window.addEventListener("DOMContentLoaded", resolve)
            })
    })
}

export const autoBlur = (element: HTMLElement | Document) => {
    return bind(element, {
        type: "keydown",
        listener: (evt) => {
            if (evt.key === "Escape") {
                const { activeElement } = document
                if (activeElement instanceof HTMLElement) {
                    activeElement.blur()
                }
            }
        },
    })
}

export const isContainTarget = <T extends EventTarget | null>(target: T, container: HTMLElement) => {
    if (!target || !(target instanceof HTMLElement)) {
        return false
    }

    return container.contains(target)
}

export const wait = (ms: number) => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export const localStorageGetItem = <T>(key: string, defaultValue: T): T => {
    const value = localStorage.getItem(key)
    if (value === null) {
        return defaultValue
    }
    try {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        return parse(value) as T
    } catch {
        return defaultValue
    }
}

export const localStorageSetItem = (key: string, value: unknown) => {
    const json = stringify(value, {})
    localStorage.setItem(key, json)
}

export const clearIndexDB = async () => {
    const databases = await window.indexedDB.databases()
    for (const { name } of databases) {
        if (!name) {
            continue
        }
        window.indexedDB.deleteDatabase(name)
    }
}
