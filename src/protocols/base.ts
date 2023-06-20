import type { Role } from "@/api/types"

export type IDProtocol = {
    id: string
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
}

export type ContentProtocol<T> = {
    content: T
}

export type VersionProtocol = {
    version: string
}

export type CreatableProtocol = {
    // createdAt: number
    updatedAt: number
    // createdBy: Role
    // updatedBy: Role
}
