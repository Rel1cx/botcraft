import { atom } from "jotai"
import { atomWithImmer } from "jotai-immer"

import { defaultBot } from "@/bots/builtins/ChatGPT"
import { configManager } from "@/config"

import { DEFAULT_APP_LAYOUT } from "./constants"

export const windowSizeAtom = atom<[number, number]>([0, 0])

windowSizeAtom.onMount = (setAtom) => {
    const resize = () => setAtom([window.innerWidth, window.innerHeight])
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
}

export const appLayoutAtom = atomWithImmer(DEFAULT_APP_LAYOUT)

export const apiKeyAtom = atom("", (_, set, payload: string) => {
    const val = payload.trim()
    set(apiKeyAtom, val)
    void configManager.setConfig("apiKey", val)
})

const defaultBotAtom = atomWithImmer(defaultBot)

export const botsAtom = atom((get) => {
    return [get(defaultBotAtom)].map((bot) => ({
        id: bot.name,
        title: bot.name,
        icon: bot.icon,
    }))
})
