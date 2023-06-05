import type { Remap } from "@/lib/utilityTypes"

import type { ContentProtocol, CreatableProtocol, RoleProtocol, StampIDProtocol, TitleProtocol } from "./misc"

export type MessageProtocol = Remap<StampIDProtocol & RoleProtocol & CreatableProtocol & ContentProtocol<string>>

export type ChatProtocol = Remap<StampIDProtocol & TitleProtocol & CreatableProtocol> &
    ContentProtocol<MessageProtocol[]>
