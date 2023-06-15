import { Button } from "@ariakit/react"
import { BiMap } from "@rizzzse/bimap"
import { formatDistanceToNow } from "date-fns"
import { Plus, Star, Trash } from "lucide-react"
import { memo, useCallback, useMemo } from "react"

// import { useHotkeys } from "react-hotkeys-hook"
import type { CreatableProtocol, ListItemProtocol, ListProtocol, TitleProtocol } from "@/protocols"

import Icon from "../atoms/Icon/Icon"
import List, { ListItem } from "../atoms/List/List"
import * as css from "./styles.css"

type TimeStackProps = ListProtocol<ListItemProtocol & CreatableProtocol> & {
    selected?: string
    newItemName?: string
    disableMutation?: boolean
    onItemClick?: (id: string) => void
    onItemAdd?: () => void
    onItemRemove?: (id: string) => void
    onItemPin?: (id: string) => void
    onItemUnpin?: (id: string) => void
    renderItemIcon?: (id: string) => React.ReactNode
}

const SectionTitle = ({ title }: TitleProtocol) => {
    return <span className={css.sectionTitle}>{title}</span>
}

const NewItemButton = ({
    disabled = false,
    onClick,
    title,
}: { title?: string; disabled?: boolean; onClick?: () => void }) => {
    return (
        <Button
            as="button"
            className={css.newChatButton}
            clickOnEnter
            clickOnSpace
            disabled={disabled}
            onClick={onClick}
        >
            <Icon as={Plus} />
            <span>{title}</span>
        </Button>
    )
}

const TimeStack = memo(
    ({
        disableMutation = false,
        items,
        newItemName = "New item",
        onItemAdd,
        onItemClick,
        onItemPin,
        onItemRemove,
        onItemUnpin,
        renderItemIcon,
        selected,
    }: TimeStackProps) => {
        const markers = useMemo(() => {
            const markers = new BiMap<string, number>()

            for (const [index, chat] of items.entries()) {
                const dateAgo = formatDistanceToNow(chat.updatedAt, { addSuffix: true })

                if (markers.has(dateAgo)) {
                    continue
                }

                markers.inverse.set(index, dateAgo)
            }

            return markers
        }, [items])

        const handleItemAdd = useCallback(() => onItemAdd?.(), [onItemAdd])

        const handleItemRemove = useCallback((id: string) => onItemRemove?.(id), [onItemRemove])

        // useHotkeys("Delete", () => {
        //     if (!selected) {
        //         return
        //     }

        //     handleItemRemove(selected)
        // })

        return (
            <div className={css.container}>
                <div className={css.actionArea}>
                    <NewItemButton title={newItemName} disabled={disableMutation} onClick={handleItemAdd} />
                </div>

                <List
                    gap={12}
                    data={items}
                    selectedID={selected}
                    renderItem={(item, selected, index) => (
                        <>
                            {!!markers.inverse.has(index) && <SectionTitle title={markers.inverse.get(index) ?? ""} />}
                            <ListItem asChild data-id={item.id} data-selected={selected}>
                                <div className={css.item} onClick={() => onItemClick?.(item.id)}>
                                    {renderItemIcon?.(item.id)}
                                    <span className={css.itemTitle}>{item.title}</span>
                                    {!!selected && (
                                        <div className={css.itemActions}>
                                            <Icon color="#fff" cursor="pointer" as={Star} />
                                            <Icon
                                                color="#fff"
                                                cursor="pointer"
                                                as={Trash}
                                                onClick={() => handleItemRemove(item.id)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </ListItem>
                        </>
                    )}
                />
            </div>
        )
    },
)

export default TimeStack
