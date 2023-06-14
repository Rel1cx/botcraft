import type { LucideProps } from "lucide-react"
import { memo } from "react"

import type { Remap } from "@/lib/utilityTypes"
import { vars } from "@/theme/vars.css"

type IconProps = Remap<
    LucideProps & {
        as: React.ComponentType<LucideProps>
        strokeWidth?: number
    }
>

const Icon = memo(({ as: Comp, color = vars.colors.text, size = 18, strokeWidth = 1.5, ...rest }: IconProps) => {
    return <Comp {...rest} size={size} color={color} strokeWidth={strokeWidth} />
})

export default Icon
