import type { PropsWithChildren } from "react"

import * as css from "./styles.css"

type AvatarProps = PropsWithChildren<{
    title?: string
    bg?: string
    size?: number
    radius?: string | number
}>

const Avatar = ({ bg, children, radius = "0.5rem", size = 44 }: AvatarProps) => {
    return (
        <div
            className={css.container}
            style={{
                backgroundImage: bg ? `url("${bg}")` : "none",
                borderRadius: radius,
                height: `${size}px`,
                width: `${size}px`,
            }}
        >
            {children}
        </div>
    )
}

export default Avatar
