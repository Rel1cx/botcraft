import { Env } from "./zod"

export const { DEV, PROD } = Env.parse(import.meta.env)

declare global {
    // rome-ignore lint/suspicious/noEmptyInterface: <explanation>
    interface ImportMetaEnv extends Env {}
}
