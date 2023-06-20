import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { withImmer } from "jotai-immer"
import { toast } from "react-hot-toast"

import { defaultBot } from "@/bots/builtins/ChatGPT"
import type { Bot } from "@/bots/builtins/types"

import { DEFAULT_APP_LAYOUT } from "./constants"

export const appLayoutAtom = atomWithStorage("APP_LAYOUT", DEFAULT_APP_LAYOUT)

export const apiKeyAtom = atomWithStorage("API_KEY", "")

export const botsAtom = atomWithStorage("BOTS", [defaultBot])

export const updateBotAtom = atom(null, (get, set, name: string, mutator: (draft: Bot) => void) => {
    set(withImmer(botsAtom), (draft: Bot[]) => {
        const bot = draft.find((bot) => bot.name === name)
        if (!bot) {
            toast.error(`Bot ${name} not found`)
            return
        }
        mutator(bot)
    })
})

export const addBotAtom = atom(null, (get, set, bot: Bot) => {
    set(withImmer(botsAtom), (draft: Bot[]) => {
        if (draft.some((b) => b.name === bot.name)) {
            toast.error(`Bot ${bot.name} already exists`)
            return
        }
        draft.push(bot)
    })
})

export const removeBotAtom = atom(null, (get, set, name: string) => {
    set(withImmer(botsAtom), (draft: Bot[]) => {
        const index = draft.findIndex((bot) => bot.name === name)
        if (index === -1) {
            toast.error(`Bot ${name} not found`)
            return
        }
        draft.splice(index, 1)
    })
})

export const botsMetaAtom = atom((get) => {
    const bots = get(botsAtom)
    return bots.map((bot) => ({
        id: bot.name,
        title: bot.name,
        icon: bot.icon,
    }))
})
