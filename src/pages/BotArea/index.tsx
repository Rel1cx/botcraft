import { useMountEffect } from "@react-hookz/web"
import { useAtomValue, useSetAtom } from "jotai"
import { Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import Redirect from "@/components/atoms/Redirect"
import { AvatarList } from "@/components/AvatarList"
import { UUIDStamp } from "@/lib/uuid"
import { Router } from "@/router"
import type { ChatItem, MessageItem } from "@/stores"
import { addChatAtom, addMessageAtom, apiKeyAtom, DEFAULT_SYSTEM_MESSAGE, sortedChatsAtom } from "@/stores"

import RootLayout from "../RootLayout"
import ChatDetail from "./ChatDetail"
import Settings from "./Settings"

type BotProps = {
    botName: string
}

const RedirectChat = ({ botName }: { botName: string }) => {
    const addMessage = useSetAtom(addMessageAtom)
    const addChat = useSetAtom(addChatAtom)
    const sortedChats = useAtomValue(sortedChatsAtom)

    // Not recommended to use this hook, but it's okay for this case
    useMountEffect(() => {
        const firstChat = sortedChats[0]

        if (firstChat) {
            Router.push("BotChat", { botName, chatID: firstChat.id })
            return
        }

        const preCreatedMessage: MessageItem = {
            id: UUIDStamp(),
            role: "system",
            content: DEFAULT_SYSTEM_MESSAGE,
            updatedAt: Date.now(),
        }

        const newChat: ChatItem = {
            id: UUIDStamp(),
            title: "",
            updatedAt: Date.now(),
            messages: [preCreatedMessage.id],
        }

        addMessage(preCreatedMessage)
        addChat(newChat)
        Router.push("BotChat", { botName, chatID: newChat.id })
    })

    return null
}

const BotArea = ({ botName }: BotProps) => {
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings", "BotChatArchive"])
    const hasApiKey = !!useAtomValue(apiKeyAtom)

    const contentView = useMemo(
        () =>
            match(route)
                .with({ name: "BotRoot" }, ({ params }) => (
                    <Redirect to={`/bots/${params.botName}/${hasApiKey ? "new" : "settings"}`} />
                ))
                .with({ name: "BotNewChat" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotSettings" }, ({ params }) => <Settings botName={params.botName} />)
                .with({ name: "BotChat" }, ({ params }) => (
                    <ChatDetail botName={params.botName} chatID={params.chatID as UUIDStamp} />
                ))
                .otherwise(() => null),
        [hasApiKey, route],
    )

    return (
        <RootLayout nav={<AvatarList selected={botName} />}>
            <Suspense>{contentView}</Suspense>
        </RootLayout>
    )
}

export default BotArea
