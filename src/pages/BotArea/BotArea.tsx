import { useMountEffect } from "@react-hookz/web"
import { useAtomValue, useSetAtom } from "jotai"
import { lazy, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import chatgpt from "@/assets/chatgpt.png?w=176&h=176&fill=contain&format=webp&quality=100"
import { defaultBot } from "@/bots"
import Redirect from "@/components/atoms/Redirect/Redirect"
import { AvatarList } from "@/components/AvatarList/AvatarList"
import { isStampID } from "@/lib/uuid"
import { Router } from "@/router"
import { addChatAtom, apiKeyAtom, sortedChatsAtom } from "@/stores"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = lazy(() => import("./Settings/Settings"))

const bots = [
    {
        id: "ChatGPT",
        title: "ChatGPT",
        icon: chatgpt,
    },
]

type BotProps = {
    botName: string
}

const RedirectChat = ({ botName }: { botName: string }) => {
    const addChat = useSetAtom(addChatAtom)
    const sortedChats = useAtomValue(sortedChatsAtom)

    // Not recommended to use this hook, but it's okay for this case
    useMountEffect(() => {
        const firstChat = sortedChats[0]

        if (firstChat) {
            Router.push("BotChat", { botName, chatID: firstChat.id })
            return
        }

        const newChat = defaultBot.initChat()

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
                .with({ name: "BotChat" }, ({ params }) => {
                    const { chatID } = params

                    if (!isStampID(chatID)) {
                        return <Redirect to={`/bots/${params.botName}`} />
                    }

                    return <ChatDetail botName={params.botName} chatID={chatID} />
                })
                .otherwise(() => null),
        [hasApiKey, route],
    )

    return (
        <RootLayout nav={<AvatarList items={bots} selected={botName} />}>
            <Suspense>{contentView}</Suspense>
        </RootLayout>
    )
}

export default BotArea
