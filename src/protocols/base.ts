import type { Role } from "@/api/types"
import type { StampID } from "@/lib/uuid"

export type IDProtocol = {
    id: string
}

export type StampIDProtocol = {
    id: StampID
}

export type RoleProtocol = {
    role: Role
}

export type TitleProtocol = {
    title: string
}

export type IconProtocol = {
    icon: string
}

export type NameProtocol = {
    name: string
    description: string
}

export type ContentProtocol<T> = {
    content: T
}

export type CreatableProtocol = {
    // createdAt: number
    updatedAt: number
    // createdBy: Role
    // updatedBy: Role
}
