import { atomWithStorage } from "jotai/utils"

import { DEFAULT_API_ENDPOINT } from "@/constants"
import { localStorageGetItem } from "@/lib/browser"

export const apiKeyAtom = atomWithStorage("API_KEY", localStorageGetItem("API_KEY", ""))

export const endpointAtom = atomWithStorage("ENDPOINT", localStorageGetItem("ENDPOINT", DEFAULT_API_ENDPOINT))
