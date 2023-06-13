/* eslint-disable functional/no-let */
import { randDrinks } from "@ngneat/falso"

export const makeNameGenerator = (size = 25) => {
    const generated = new Set<string>()

    return () => {
        let name = randDrinks()

        while (generated.has(name)) {
            name = randDrinks()
        }

        if (generated.size > size) {
            generated.delete(generated.values().next().value)
        }

        generated.add(name)

        return name
    }
}
