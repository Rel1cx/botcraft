import { useAtomValue, useStore } from "jotai"
import * as React from "react"
import { match } from "ts-pattern"

import { botsMetaAtom, sortedChatsAtom } from "@/atoms"
import Redirect from "@/components/atoms/Redirect/Redirect"
import { BotList } from "@/components/BotList/BotList"
import { Router } from "@/router"
import { isChatID } from "@/zod/id"

import RootLayout from "../RootLayout/RootLayout"

const ChatDetail = React.lazy(() => import("./ChatDetail/ChatDetail"))

const Settings = React.lazy(() => import("./Settings/Settings"))

type BotProps = {
    botName: string
}

const RedirectChat = React.memo(({ botName }: { botName: string }) => {
    const store = useStore()
    const firstChat = useAtomValue(sortedChatsAtom, { store })[0]

    if (firstChat) {
        return <Redirect to={`/bots/${botName}/${firstChat.id}`} />
    }

    return null
})

const BotArea = ({ botName }: BotProps) => {
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings", "BotChatArchive"])
    const botsMeta = useAtomValue(botsMetaAtom)

    const contentView = React.useMemo(
        () =>
            match(route)
                .with({ name: "BotRoot" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotNewChat" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotSettings" }, ({ params }) => <Settings botName={params.botName} />)
                .with({ name: "BotChat" }, ({ params }) => {
                    const { chatID } = params

                    if (!isChatID(chatID)) {
                        return <Redirect to={`/bots/${params.botName}`} />
                    }

                    return <ChatDetail botName={params.botName} chatID={chatID} />
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
