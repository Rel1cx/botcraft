import { useAtomValue } from "jotai";
import * as React from "react";
import { match } from "ts-pattern";

import Redirect from "@/components/atoms/Redirect/Redirect";
import { BotList } from "@/components/BotList/BotList";
import { Router } from "@/router";
import { botListAtom, useBot, useFirstChatMeta } from "@/stores";
import { isChatID } from "@/zod/id";

import RootLayout from "../RootLayout/RootLayout";

const ChatDetail = React.lazy(() => import("./ChatDetail/ChatDetail"));

const BotSettings = React.lazy(() => import("./BotSettings/BotSettings"));

type BotAreaProps = {
    botName: string;
};

const RedirectChat = React.memo(({ botName }: { botName: string }) => {
    const firstChat = useFirstChatMeta(botName);

    if (firstChat) {
        return <Redirect to={`/bots/${botName}/${firstChat.id}`} />;
    }

    return <Redirect to="/404" />;
});

const BotArea = ({ botName }: BotAreaProps) => {
    const [bot] = useBot(botName);
    const route = Router.useRoute(["BotRoot", "BotChat", "BotNewChat", "BotSettings"]);
    const botList = useAtomValue(botListAtom);

    const contentView = React.useMemo(
        () =>
            match(route)
                .with({ name: "BotRoot" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotNewChat" }, ({ params }) => <RedirectChat botName={params.botName} />)
                .with({ name: "BotSettings" }, ({ params }) => <BotSettings botName={params.botName} />)
                .with({ name: "BotChat" }, ({ params }) => {
                    const { botName, chatID } = params;

                    if (!isChatID(chatID)) {
                        return <Redirect to="/404" />;
                    }

                    return <ChatDetail botName={botName} chatID={chatID} />;
                })
                .otherwise(() => null),
        [route],
    );

    if (!bot) {
        return <Redirect to="/404" />;
    }

    return (
        <RootLayout nav={<BotList items={botList} selected={botName} />}>
            <React.Suspense>{contentView}</React.Suspense>
        </RootLayout>
    );
};

export default BotArea;
