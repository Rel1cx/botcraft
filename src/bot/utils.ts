import { pick } from "rambda"

import type { Message } from "@/api/types"
import type { Role } from "@/zod"

export const extractMessages = (data: Message[]) => data.map(pick(["role", "content"]))

export const filterMessages = (data: Message[]) => data.filter((item) => item.content.trim() !== "")

export const excludeMessages = (role: Role) => (data: Message[]) => data.filter((item) => item.role !== role)
