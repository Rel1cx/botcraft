export type EquatableProtocol<T> = {
    equals: (other: T) => boolean
}

export type CodableProtocol<T> = {
    encode: (a: T) => string
    decode: (a: string) => T
}
