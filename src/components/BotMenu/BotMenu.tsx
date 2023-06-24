import { Menu } from "@mantine/core"
import { FileArrowDown, FileArrowUp, Gear, Trash } from "@phosphor-icons/react"
import * as React from "react"

import { Router } from "@/router"

import Icon from "../atoms/Icon/Icon"
import * as css from "./styles.css"

type BotMenuProps = {
    botName: string
    children: React.ReactNode
}

const BotMenu = React.memo(({ botName, children }: BotMenuProps) => {
    return (
        <Menu shadow="md" width={200} position="bottom-start">
            <Menu.Target>{children}</Menu.Target>
            <Menu.Dropdown className={css.root}>
                <Menu.Label>Preferences</Menu.Label>
                <Menu.Item
                    icon={<Icon as={Gear} />}
                    onClick={() => {
                        Router.push("BotSettings", { botName })
                    }}
                >
                    Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<Icon as={FileArrowUp} />}>Import data from file</Menu.Item>
                <Menu.Item icon={<Icon as={FileArrowDown} />}>Export data to file</Menu.Item>
                <Menu.Item color="red" icon={<Icon as={Trash} />} disabled>
                    Delete bot
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
})

export default BotMenu
