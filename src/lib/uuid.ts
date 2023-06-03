import { Brand } from "ftld"
import ShortUniqueId from "short-unique-id"

export type UUID = Brand<string, "UUID">

export type StampID = Brand<string, "StampID">

export const uid = new ShortUniqueId({ length: 12 })

export const UUID = (): UUID => uid() as UUID

export const StampID = Brand<Error, StampID>(
    (value) => {
        try {
            return uid.parseStamp(value) instanceof Date
        } catch {
            return false
        }
    },
    (value) => {
        return new Error(`Invalid StampID: ${value}`)
    },
)

export const makeID = (length = 12) => StampID(uid.stamp(length)).unwrap()
