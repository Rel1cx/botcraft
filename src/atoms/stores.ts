import { createStore } from "jotai"

import { defaultBot } from "@/bots/builtins/ChatGPT"

// Global store
export const appStore = createStore()

// Bots store
export const botsStore = new Map([[defaultBot.id, createStore()]])
