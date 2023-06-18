import { useAtomValue } from "jotai"
import * as React from "react"
import { match } from "ts-pattern"

import { addChatAtom, botAtom, botsAtom, botsStore, sortedChatsAtom } from "@/atoms"
import Redirect from "@/components/atoms/Redirect/Redirect"
import { BotList } from "@/components/BotList/BotList"
import { isStampID } from "@/lib/uuid"
import { Router } from "@/router"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = React.lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = React.lazy(() => import("./Settings/Settings"))

type BotProps = {
    botName: string
}

class RedirectChat extends React.Component<{ botName: string }> {
    override componentDidMount() {
        const { botName } = this.props
        const botStore = botsStore.get(botName)

        if (!botStore) {
            window.history.replaceState({}, "", "/")
            return
        }

        const bot = botStore.get(botAtom)
        const sortedChats = botStore.get(sortedChatsAtom)

        const firstChat = sortedChats[0]

        if (firstChat) {
            Router.push("BotChat", { botName, chatID: firstChat.id })
            return
        }

        const newChat = bot.initChat()

        botStore.set(addChatAtom, newChat)

        Router.push("BotChat", { botName, chatID: newChat.id })
    }

    override render() {
        return null
    }
}

const BotArea = ({ botName }: BotProps) => {
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings", "BotChatArchive"])
    // const hasApiKey = !!useAtomValue(apiKeyAtom)
    const bots = useAtomValue(botsAtom)

    const contentView = React.useMemo(
        () =>
            match(route)
                // .with({ name: "BotRoot" }, ({ params }) => (
                //     <Redirect to={`/bots/${params.botName}/${hasApiKey ? "new" : "settings"}`} />
                // ))
                .with({ name: "BotRoot" }, ({ params }) => <Redirect to={`/bots/${params.botName}/new`} />)
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
        [route],
    )

    return (
        <RootLayout nav={<BotList items={bots} selected={botName} />}>
            <React.Suspense>{contentView}</React.Suspense>
        </RootLayout>
    )
}

export default BotArea
