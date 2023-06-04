import "@total-typescript/ts-reset"

import type { Progress } from "rsup-progress"

declare global {
    interface Window {
        progress: Progress
    }
}
