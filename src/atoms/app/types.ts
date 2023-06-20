import type { Model } from "@/zod"

export type TotalTokenUsed = {
    [model in Model]?: {
        promptTokens: number
        completionTokens: number
    }
}

export type API = {
    apiKey: string
    endpoint: string
}

export type Config = {
    locale: string
    autoTitle: boolean
    countTotalTokens: boolean
    totalTokenUsed: TotalTokenUsed
}
