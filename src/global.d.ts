import "@total-typescript/ts-reset"

import type { Progress } from "rsup-progress"

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Window {
        progress: Progress
    }
}
