export type Remap<T> =
    // eslint-disable-next-line @typescript-eslint/ban-types, functional/readonly-type
    {} & {
        [P in keyof T]: T[P]
    }

export type UnionFromTuple<T> = T extends (infer U)[] ? U : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never
