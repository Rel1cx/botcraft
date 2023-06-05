import { ConfigManager } from "./lib/config"
import { Config } from "./zod"

export const configManager = ConfigManager.make({ name: ".config.dat", parse: (data) => Config.parse(data) })
