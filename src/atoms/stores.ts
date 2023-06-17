import { createStore, getDefaultStore } from "jotai"

import { ChatGPT } from "@/bots/builtins/ChatGPT"

export const defaultBot = new ChatGPT()

// Global store
export const appStore = getDefaultStore()

// Bots store
export const botsStore = new Map([[defaultBot.name, createStore()]])
