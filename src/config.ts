import { ConfigManager } from "./lib/config"
import { Config } from "./zod"

export const defaultConfig: Config = {
    apiKey: "",
    // model: "gpt-3.5-turbo",
    // temperature: 0.5,
    // max_tokens: 4096,
    // top_p: 1,
    // best_of: 1,
    // n: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
}

export const configManager = ConfigManager.make({ name: ".config.dat", parse: (data) => Config.parse(data) })
