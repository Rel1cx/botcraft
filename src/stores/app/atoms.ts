import type { Draft } from "immer"
import { atom, createStore, getDefaultStore } from "jotai"
import { atomWithImmer } from "jotai-immer"

import { ChatGPT } from "@/bots/builtins/ChatGPT"
import { configManager } from "@/config"

import { DEFAULT_APP_LAYOUT } from "./constants"
import type { AppLayout } from "./types"

export const appStore = getDefaultStore()

export const windowSizeAtom = atom<[number, number]>([0, 0])

windowSizeAtom.onMount = (setAtom) => {
    const resize = () => setAtom([window.innerWidth, window.innerHeight])
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
}

export const appLayoutAtom = atomWithImmer(DEFAULT_APP_LAYOUT)

export const setAppLayout = (mutator: (draft: Draft<AppLayout>) => void) => {
    appStore.set(appLayoutAtom, mutator)
}

export const apiKeyAtom = atom("", (_, set, payload: string) => {
    const val = payload.trim()
    set(apiKeyAtom, val)
    void configManager.setConfig("apiKey", val)
})

const defaultBot = new ChatGPT()

const defaultBotAtom = atomWithImmer(defaultBot)

export const botsAtom = atom((get) => {
    return [get(defaultBotAtom)].map((bot) => ({
        id: bot.name,
        title: bot.name,
        icon: bot.icon,
    }))
})

export const botsStore = new Map([[defaultBot.name, createStore()]])
