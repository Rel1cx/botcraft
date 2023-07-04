import { tinykeys } from "tinykeys"

export const installAutoBlur = (target: HTMLElement | Window = window) => {
    return tinykeys(
        target,
        {
            Escape: (event) => {
                event.preventDefault()
                const { activeElement } = document
                if (activeElement instanceof HTMLElement) {
                    activeElement.blur()
                }
            },
        },
        { event: "keydown" },
    )
}

export const installAutoTooltip = (target: HTMLElement | Window = window) => {
    const uninstallKeyDown = tinykeys(
        target,
        {
            Alt: () => {
                document.documentElement.style.setProperty("--tooltip-opacity", "1")
            },
        },
        { event: "keydown" },
    )

    const uninstallKeyUp = tinykeys(
        target,
        {
            Alt: () => {
                document.documentElement.style.setProperty("--tooltip-opacity", "0")
            },
        },
        { event: "keyup" },
    )

    return () => {
        uninstallKeyDown()
        uninstallKeyUp()
    }
}
