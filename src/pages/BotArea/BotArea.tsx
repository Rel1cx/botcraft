import { useMountEffect } from "@react-hookz/web"
import { useAtomValue, useSetAtom } from "jotai"
import { lazy, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import Redirect from "@/components/atoms/Redirect/Redirect"
import { BotList } from "@/components/BotList/BotList"
import { isStampID } from "@/lib/uuid"
import { Router } from "@/router"
import { addChatAtom, apiKeyAtom, botsAtom, defaultBotAtom, sortedChatsAtom } from "@/stores"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = lazy(() => import("./Settings/Settings"))

type BotProps = {
    botName: string
}

const RedirectChat = ({ botName }: { botName: string }) => {
    const bot = useAtomValue(defaultBotAtom)
    const addChat = useSetAtom(addChatAtom)
    const sortedChats = useAtomValue(sortedChatsAtom)

    // Not recommended to use this hook, but it's okay for this case
    useMountEffect(() => {
        const firstChat = sortedChats[0]

        if (firstChat) {
            Router.push("BotChat", { botName, chatID: firstChat.id })
            return
        }

        const newChat = bot.initChat()

        addChat(newChat)

        Router.push("BotChat", { botName, chatID: newChat.id })
    })

    return null
}

const BotArea = ({ botName }: BotProps) => {
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings", "BotChatArchive"])
    const hasApiKey = !!useAtomValue(apiKeyAtom)
    const bots = useAtomValue(botsAtom)

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
        <RootLayout nav={<BotList items={bots} selected={botName} />}>
            <Suspense>{contentView}</Suspense>
        </RootLayout>
    )
}

export default BotArea
