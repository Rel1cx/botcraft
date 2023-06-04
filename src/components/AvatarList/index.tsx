import { Indicator } from "@mantine/core"
import { Link } from "@swan-io/chicane"
import { Plus } from "lucide-react"

import type { IconProtocol, ListItemProtocol, ListProtocol } from "@/protocols"
import { vars } from "@/theme/vars.css"

import Avatar from "../atoms/Avatar"
import Icon from "../atoms/Icon"
import * as css from "./styles.css"

type AvatarListProps = ListProtocol<ListItemProtocol & IconProtocol> & {
    selected?: string
}

export const AvatarList = ({ items, selected }: AvatarListProps) => {
    return (
        <div className={css.container}>
            {items.map((item) => (
                <Link key={item.id} to={`/bots/${item.id}`}>
                    <Avatar bg={item.icon} />
                </Link>
            ))}
            <Indicator inline label="WIP" size={14}>
                <div className={css.plus}>
                    <Icon as={Plus} size={24} color={vars.colors.overlay} />
                </div>
            </Indicator>
        </div>
    )
}
