import type { Nominal } from "nominal-types"
import ShortUniqueId from "short-unique-id"

export type UUID = Nominal<"UUID", string>

export type StampID = Nominal<"StampID", string>

export const uid = new ShortUniqueId({ length: 12 })

export const isStampID = (value: unknown): value is StampID => {
    if (typeof value !== "string") {
        return false
    }
    try {
        return uid.parseStamp(value) instanceof Date
    } catch {
        return false
    }
}

export const makeID = (length = 12) => uid.stamp(length) as StampID
