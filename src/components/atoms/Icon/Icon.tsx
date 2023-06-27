import type { IconProps as PhosphorProps } from "@phosphor-icons/react"
import * as React from "react"

import type { Remap } from "@/lib/utils"
import { vars } from "@/theme/vars.css"

type IconProps = Remap<
    PhosphorProps & {
        as: React.ComponentType<PhosphorProps>
        strokeWidth?: number
    }
>

const Icon = React.memo(({ as: Comp, color = vars.colors.text, size = 18, strokeWidth = 1.5, ...rest }: IconProps) => {
    return <Comp {...rest} size={size} color={color} strokeWidth={strokeWidth} />
})

export default Icon
