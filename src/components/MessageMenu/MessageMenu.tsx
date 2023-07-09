import { Menu } from "@mantine/core";
import type { FloatingPosition } from "@mantine/core/lib/Floating";
import { Repeat, Trash } from "@phosphor-icons/react";
import * as React from "react";

import Icon from "../atoms/Icon/Icon";
import * as css from "./styles.css";

type MessageMenuProps = React.PropsWithChildren<{
    position?: FloatingPosition;
    onRegenerateClick?: () => void;
    onRemoveClick?: () => void;
}>;

const MessageMenu = React.memo(
    ({ children, onRegenerateClick, onRemoveClick, position = "bottom" }: MessageMenuProps) => {
        return (
            <Menu shadow="md" width={200} position={position}>
                <Menu.Target>{children}</Menu.Target>
                <Menu.Dropdown className={css.root}>
                    <Menu.Item icon={<Icon as={Repeat} />} onClick={onRegenerateClick}>
                        Regenerate message
                    </Menu.Item>
                    <Menu.Item color="red" icon={<Icon as={Trash} />} onClick={onRemoveClick}>
                        Delete message
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    },
);

export default MessageMenu;
