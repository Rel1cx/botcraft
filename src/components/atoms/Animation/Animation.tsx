import { domAnimation, LazyMotion, MotionConfig } from "framer-motion"
import * as React from "react"

type AnimationProps = {
    children: React.ReactNode
}

const Animation = React.memo(({ children }: AnimationProps) => {
    return (
        <MotionConfig transition={{ duration: 0.12, ease: "easeOut" }}>
            <LazyMotion features={domAnimation} strict>
                {children}
            </LazyMotion>
        </MotionConfig>
    )
})

export default Animation
