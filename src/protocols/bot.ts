import type { Remap } from "@/lib/utilityTypes"

import type { ContentProtocol, CreatableProtocol, IDProtocol, RoleProtocol, TitleProtocol } from "./base"

export type MessageProtocol = Remap<IDProtocol & RoleProtocol & CreatableProtocol & ContentProtocol<string>>

export type ChatProtocol = Remap<
    (IDProtocol & TitleProtocol & CreatableProtocol & ContentProtocol<MessageProtocol[]>) & {
        intro: string
    }
>
