import { Result } from "@swan-io/boxed"

// eslint-disable-next-line etc/no-misused-generics
export const parse = <T = unknown>(json: string) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return Result.fromExecution(() => JSON.parse(json) as T)
}

export const stringify = (data: unknown) => {
    return JSON.stringify(data, null, 0)
}
