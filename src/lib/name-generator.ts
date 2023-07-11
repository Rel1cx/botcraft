import { generateMnemonic } from "@scure/bip39";

import { capitalize } from "./string";

const wordlist = await import("@scure/bip39/wordlists/english").then((m) => m.wordlist);

export const getRandomWords = (length = 3) =>
    generateMnemonic(wordlist).split(" ").slice(0, length).map(capitalize).join(" ");

export const makeNameGenerator = (size = 25) => {
    const generated = new Set<string>();

    return () => {
        let name = getRandomWords();

        while (generated.has(name)) {
            name = getRandomWords();
        }

        // eslint-disable-next-line functional/no-conditional-statements
        if (generated.size > size) {
            generated.delete(generated.values().next().value);
        }

        generated.add(name);

        return name;
    };
};
