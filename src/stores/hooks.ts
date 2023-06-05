import { atom, useAtom } from "jotai"
import { useMemo } from "react"

import type { StampID } from "@/lib/uuid"

import { chatsAtom, messagesAtom } from "./bot/atoms"

export const useChat = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(chatsAtom).get(id)), [id]))
}

export const useMessage = (id: StampID) => {
    return useAtom(useMemo(() => atom((get) => get(messagesAtom).get(id)), [id]))
}
