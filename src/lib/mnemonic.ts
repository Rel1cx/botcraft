import { generateMnemonic } from "@scure/bip39"
import { wordlist } from "@scure/bip39/wordlists/english"

export const generate = (length = 3) => generateMnemonic(wordlist).split(" ").slice(0, length).join(" ")
