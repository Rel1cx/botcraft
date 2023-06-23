import { useAtomValue } from "jotai"
import { useTransientAtom } from "jotai-game"
import * as React from "react"
import { match } from "ts-pattern"

import Redirect from "@/components/atoms/Redirect/Redirect"
import { BotList } from "@/components/BotList/BotList"
import { Router } from "@/router"
import { botsMetaAtom, useFirstChatMeta } from "@/stores"
import { botsDb } from "@/stores/db"
import { isChatID } from "@/zod/id"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = React.lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = React.lazy(() => import("./Settings/Settings"))

type BotAreaProps = {
    botName: string
}

const RedirectChat = React.memo(({ botName }: { botName: string }) => {
    const firstChat = useFirstChatMeta(botName)

    if (firstChat) {
        return <Redirect to={`/bots/${botName}/${firstChat.id}`} />
    }

    return null
})

const ChatGuard = React.memo(
    ({ botName, chatID, children }: { botName: string; chatID: string; children: React.ReactNode }) => {
        const [getBot] = useTransientAtom(botsDb.item(botName))

        if (!isChatID(chatID) || !getBot()?.chats.includes(chatID)) {
            return <Redirect to="/404" />
        }

        return children
    },
)

const BotArea = ({ botName }: BotAreaProps) => {
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings", "BotChatArchive"])
    const botsMeta = useAtomValue(botsMetaAtom)

    const contentView = React.useMemo(
        () =>
            match(route)
                .with({ name: "BotRoot" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotNewChat" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotSettings" }, ({ params }) => <Settings botName={params.botName} />)
                .with({ name: "BotChat" }, ({ params }) => {
                    const { botName, chatID } = params
                    if (!isChatID(chatID)) {
                        return <Redirect to="/404" />
                    }
                    return (
                        <ChatGuard botName={botName} chatID={chatID}>
                            <ChatDetail botName={botName} chatID={chatID} />
                        </ChatGuard>
                    )
                })
                .otherwise(() => null),
        [route],
    )

    return (
        <RootLayout nav={<BotList items={botsMeta} selected={botName} />}>
            <React.Suspense>{contentView}</React.Suspense>
        </RootLayout>
    )
}

export default BotArea
