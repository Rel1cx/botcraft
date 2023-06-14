import { Menu } from "@mantine/core"
import { Delete, FileDown, FileUp, Settings } from "lucide-react"
import { memo } from "react"

import { Router } from "@/router"

import Icon from "../atoms/Icon/Icon"
import * as css from "./styles.css"

type BotMenuProps = {
    botName: string
    children: React.ReactNode
}

const BotMenu = memo(({ botName, children }: BotMenuProps) => {
    return (
        <Menu shadow="md" width={200} position="bottom-start">
            <Menu.Target>{children}</Menu.Target>
            <Menu.Dropdown className={css.container}>
                <Menu.Label>Preferences</Menu.Label>
                <Menu.Item
                    icon={<Icon as={Settings} />}
                    onClick={() => {
                        Router.push("BotSettings", { botName })
                    }}
                >
                    Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item icon={<Icon as={FileUp} />}>Import data from file</Menu.Item>
                <Menu.Item icon={<Icon as={FileDown} />}>Export data to file</Menu.Item>
                <Menu.Item color="red" icon={<Icon as={Delete} />} disabled>
                    Delete bot
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
})

export default BotMenu
