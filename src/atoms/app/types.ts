import type { Model } from "@/zod"

export type TotalTokenUsed = {
    [model in Model]?: {
        promptTokens: number
        completionTokens: number
    }
}
