import { Slot } from "@radix-ui/react-slot"
import { AnimatePresence, m } from "framer-motion"
import { forwardRef, lazy, memo, useRef } from "react"

import type { ListItemProtocol } from "@/protocols"

import * as css from "./styles.css"

const Animation = lazy(() => import("@/components/atoms/Animation"))

type ListProps = {
    gap?: number
    data?: ListItemProtocol[]
    selectedID?: string | undefined
    renderItem?: (item: ListItemProtocol, selected: boolean, index: number) => React.ReactNode
    // onSelectPrev?: () => void
    // onSelectNext?: () => void
}

const defaultData: ListItemProtocol[] = []

export type ListItemProps = {
    asChild?: boolean
    children: React.ReactNode
}

export const ListItem = memo(
    forwardRef<HTMLDivElement, ListItemProps>(({ asChild, ...rest }: ListItemProps, ref) => {
        const Comp = asChild ? Slot : "div"

        return <Comp className={css.item} ref={ref} {...rest} />
    }),
)

const List = memo(
    forwardRef<HTMLDivElement, ListProps>(
        ({ data = defaultData, gap = 0, renderItem, selectedID, ...rest }: ListProps, ref) => {
            const scrollContainer = useRef<HTMLDivElement>(null)

            return (
                <div ref={ref} className={css.container} {...rest}>
                    <div className={css.content} ref={scrollContainer}>
                        <div
                            className={css.itemList}
                            style={{
                                gap,
                            }}
                        >
                            <Animation>
                                <AnimatePresence>
                                    {data.map((item, index) => {
                                        return (
                                            <m.div key={item.id} initial={{ opacity: 0.95 }} animate={{ opacity: 1 }}>
                                                {renderItem?.(item, item.id === selectedID, index)}
                                            </m.div>
                                        )
                                    })}
                                </AnimatePresence>
                            </Animation>
                        </div>
                    </div>
                </div>
            )
        },
    ),
)

export default List
