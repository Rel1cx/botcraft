import { bind } from "bind-event-listener"
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
