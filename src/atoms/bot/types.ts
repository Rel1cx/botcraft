import type { StrictOmit } from "ts-essentials"

import type { ChatData } from "@/bots/builtins/types"
import type { Remap } from "@/lib/utilityTypes"
import type { StampID } from "@/lib/uuid"
import type { ChatProtocol } from "@/protocols"

export type ChatItem = StrictOmit<ChatData, "content"> & {
    messages: StampID[]
}

export type ChatMeta = Pick<ChatProtocol, "id" | "title" | "updatedAt">

export type ChatCompletionTaskMeta = {
    id: StampID
    chatID: StampID
    generatingMessageID: StampID
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
