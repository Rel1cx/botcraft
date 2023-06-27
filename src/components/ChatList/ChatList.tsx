import { Button } from "@ariakit/react"
import { Plus, X } from "@phosphor-icons/react"
import { BiMap } from "@rizzzse/bimap"
import { formatDistanceToNow } from "date-fns"
import * as React from "react"

import type { CreatableProtocol, ListItemProtocol, ListProtocol, TitleProtocol } from "@/protocols"

import Icon from "../atoms/Icon/Icon"
import List, { ListItem } from "../atoms/List/List"
import * as css from "./styles.css"

type ChatListProps = ListProtocol<ListItemProtocol & CreatableProtocol> & {
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
            className={css.listActionButton}
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

const ChatList = React.memo(
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
    }: ChatListProps) => {
        const markers = React.useMemo(() => {
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

        const handleItemAdd = React.useCallback(() => onItemAdd?.(), [onItemAdd])

        const handleItemRemove = React.useCallback((id: string) => onItemRemove?.(id), [onItemRemove])

        return (
            <div className={css.root}>
                <div className={css.listAction}>
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
                                            <Button
                                                className={css.itemActionButton}
                                                as="button"
                                                onClick={() => handleItemRemove(item.id)}
                                            >
                                                <Icon as={X} color="#fff" />
                                            </Button>
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

export default ChatList
