import { useAtomValue } from "jotai"
import { Component, lazy, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import Redirect from "@/components/atoms/Redirect/Redirect"
import { BotList } from "@/components/BotList/BotList"
import { isStampID } from "@/lib/uuid"
import { Router } from "@/router"
import { addChatAtom, apiKeyAtom, botsAtom, defaultBotAtom, sortedChatsAtom, store } from "@/stores"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = lazy(() => import("./Settings/Settings"))

type BotProps = {
    botName: string
}

class RedirectChat extends Component<{ botName: string }> {
    override componentDidMount() {
        const { botName } = this.props
        const bot = store.get(defaultBotAtom)
        const sortedChats = store.get(sortedChatsAtom)

        const firstChat = sortedChats[0]

        if (firstChat) {
            Router.push("BotChat", { botName, chatID: firstChat.id })
            return
        }

        const newChat = bot.initChat()

        store.set(addChatAtom, newChat)

        Router.push("BotChat", { botName, chatID: newChat.id })
    }

    override render() {
        return null
    }
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
