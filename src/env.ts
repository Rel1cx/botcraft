import { Env } from "./zod"

export const { VITE_OPENAI_API_ENDPOINT, VITE_OPENAI_API_KEY } = Env.parse(import.meta.env)

declare global {
    // rome-ignore lint/suspicious/noEmptyInterface: <explanation>
    interface ImportMetaEnv extends Env {}
}
