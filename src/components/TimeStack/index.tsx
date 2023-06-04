import { Box } from "@mantine/core"
import { BiMap } from "@rizzzse/bimap"
import { Link } from "@swan-io/chicane"
import { formatDistanceToNow } from "date-fns"
import { PlusIcon } from "lucide-react"
import { memo, useMemo } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import useEvent from "react-use-event-hook"

import type { CreatableProtocol, ListItemProtocol, ListProtocol, TitleProtocol } from "@/protocols"

import Icon from "../atoms/Icon"
import List, { ListItem } from "../atoms/List"
import * as css from "./styles.css"

type TimeStackProps = ListProtocol<ListItemProtocol & CreatableProtocol> & {
    selected?: string
    newItemName?: string
    disableMutation?: boolean
    onItemAdd?: () => void
    onItemRemove?: (id: string) => void
    onItemPin?: (id: string) => void
    onItemUnpin?: (id: string) => void
}

const SectionTitle = ({ title }: TitleProtocol) => {
    return <span className={css.sectionTitle}>{title}</span>
}

const NewItemButton = ({ title, ...rest }: React.ComponentProps<"button">) => {
    return (
        <button type="button" className={css.newChatButton} {...rest}>
            <Icon as={PlusIcon} />
            <span>{title}</span>
        </button>
    )
}

const TimeStack = memo(
    ({
        disableMutation = false,
        items,
        newItemName,
        onItemAdd,
        onItemPin,
        onItemRemove,
        onItemUnpin,
        selected,
    }: TimeStackProps) => {
        const markers = useMemo(() => {
            const markers: BiMap<string, number> = new BiMap()

            for (const [index, chat] of items.entries()) {
                const dateAgo = formatDistanceToNow(chat.updatedAt, { addSuffix: true })

                if (markers.has(dateAgo)) {
                    continue
                }

                markers.inverse.set(index, dateAgo)
            }

            return markers
        }, [items])

        const handleItemAdd = useEvent(() => onItemAdd?.())

        const handleItemRemove = useEvent((id: string) => onItemRemove?.(id))

        useHotkeys("del, backspace", () => {
            if (!selected) {
                return
            }

            handleItemRemove(selected)
        })

        return (
            <div className={css.container}>
                <Box w="100%" mb="0.5rem" px="0.5rem">
                    <NewItemButton title={newItemName} disabled={disableMutation} onClick={handleItemAdd} />
                </Box>
                <List
                    gap={12}
                    data={items}
                    selectedID={selected}
                    renderItem={(item, selected, index) => (
                        <>
                            {markers.inverse.has(index) ? (
                                <SectionTitle title={markers.inverse.get(index) ?? ""} />
                            ) : null}
                            <ListItem
                                component={Link}
                                className={css.item}
                                data-id={item.id}
                                data-selected={selected}
                                to={`/bots/ChatGPT/${item.id}`}
                            >
                                {item.title}
                            </ListItem>
                        </>
                    )}
                />
            </div>
        )
    },
)

export default TimeStack
