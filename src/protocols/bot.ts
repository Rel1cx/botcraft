import type { Remap } from "@/lib/utilityTypes"

import type { ContentProtocol, CreatableProtocol, RoleProtocol, StampIDProtocol, TitleProtocol } from "./misc"

export type MessageProtocol = Remap<StampIDProtocol & RoleProtocol & CreatableProtocol & ContentProtocol<string>>

export type ChatProtocol = Remap<
    StampIDProtocol &
        TitleProtocol &
        CreatableProtocol &
        ContentProtocol<MessageProtocol[]> & {
            intro: string
        }
>

export type BotProtocol = {
    prompt: string

    intro: string

    options: Record<string, unknown>
}
