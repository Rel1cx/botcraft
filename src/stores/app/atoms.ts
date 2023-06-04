import type { Draft } from "immer"
import { atom, getDefaultStore } from "jotai"
import { atomWithImmer } from "jotai-immer"

import { DEFAULT_APP_LAYOUT } from "./constants"
import type { AppLayout } from "./types"

const store = getDefaultStore()

export const windowSizeAtom = atom<[number, number]>([0, 0])

windowSizeAtom.onMount = (setAtom) => {
    const resize = () => setAtom([window.innerWidth, window.innerHeight])
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
}

export const appLayoutAtom = atomWithImmer(DEFAULT_APP_LAYOUT)

export const setAppLayout = (mutator: (draft: Draft<AppLayout>) => void) => {
    store.set(appLayoutAtom, mutator)
}
