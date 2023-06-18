import { Button } from "@ariakit/react"
import { Indicator } from "@mantine/core"
import { Plus } from "@phosphor-icons/react"
import { Link } from "@swan-io/chicane"

import type { IconProtocol, ListItemProtocol, ListProtocol } from "@/protocols"
import { vars } from "@/theme/vars.css"

import Avatar from "../atoms/Avatar/Avatar"
import Icon from "../atoms/Icon/Icon"
import BotMenu from "../BotMenu/BotMenu"
import * as css from "./styles.css"

type BotListProps = ListProtocol<ListItemProtocol & IconProtocol> & {
    selected?: string
}

export const BotList = ({ items, selected }: BotListProps) => {
    return (
        <div className={css.container}>
            {items.map((item) => {
                const avatar = <Avatar bg={item.icon} />
                if (selected === item.id) {
                    return (
                        <BotMenu key={item.id} botName={item.title}>
                            <Button as="button" clickOnEnter clickOnSpace aria-label="bot-button">
                                {avatar}
                            </Button>
                        </BotMenu>
                    )
                }
                return (
                    <Link key={item.id} to={`/bots/${item.title}`}>
                        {avatar}
                    </Link>
                )
            })}
            <Indicator inline label="WIP" size={14}>
                <div className={css.plus}>
                    <Icon as={Plus} size={24} color={vars.colors.overlay} />
                </div>
            </Indicator>
        </div>
    )
}
