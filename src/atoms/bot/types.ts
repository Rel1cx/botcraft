import type { StrictOmit } from "ts-essentials"

import type { ChatData } from "@/bots/builtins/types"
import type { Remap } from "@/lib/utilityTypes"
import type { ChatProtocol } from "@/protocols"
import type { ChatID, MessageID } from "@/zod/id"

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
              error: Error
          } & ChatCompletionTaskMeta
      >
