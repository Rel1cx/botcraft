import { Slot } from "@radix-ui/react-slot"
import * as React from "react"

import type { ListItemProtocol } from "@/protocols"

import * as css from "./styles.css"

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

export const ListItem = React.memo(
    React.forwardRef<HTMLDivElement, ListItemProps>(({ asChild, ...rest }: ListItemProps, ref) => {
        const Comp = asChild ? Slot : "div"

        return <Comp className={css.item} ref={ref} {...rest} />
    }),
)

const List = React.memo(
    React.forwardRef<HTMLDivElement, ListProps>(
        ({ data = defaultData, gap = 0, renderItem, selectedID, ...rest }: ListProps, ref) => {
            const scrollContainer = React.useRef<HTMLDivElement>(null)

            return (
                <div ref={ref} className={css.root} {...rest}>
                    <div className={css.content} ref={scrollContainer}>
                        <div
                            className={css.itemList}
                            style={{
                                gap,
                            }}
                        >
                            {data.map((item, index) => {
                                return <div key={item.id}>{renderItem?.(item, item.id === selectedID, index)}</div>
                            })}
                        </div>
                    </div>
                </div>
            )
        },
    ),
)

export default List
