import type { StrictOmit } from "ts-essentials"

import type { ChatData } from "@/bots/builtins/types"
import type { Remap } from "@/lib/utils"
import type { ChatProtocol } from "@/protocols"
import type { Model } from "@/zod"
import type { ChatID, MessageID } from "@/zod/id"

export type TotalTokenUsed = {
    [model in Model]?: {
        promptTokens: number
        completionTokens: number
    }
}

export type ChatItem = StrictOmit<ChatData, "content"> & {
    messages: MessageID[]
}

export type ChatMeta = Pick<ChatProtocol, "id" | "title" | "updatedAt">

export type ChatCompletionTaskMeta = {
    id: string
    chatID: ChatID
    generatingMessageID: MessageID
}

export type ChatCompletionTask =
    | Remap<
          {
              type: "pending"
              content: string
              abort: () => void
          } & ChatCompletionTaskMeta
      >
    | Remap<
          {
              type: "done"
              content: string
          } & ChatCompletionTaskMeta
      >
    | Remap<
          {
              type: "error"
              content: string
              error: Error
          } & ChatCompletionTaskMeta
      >
