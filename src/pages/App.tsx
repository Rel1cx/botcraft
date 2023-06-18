import { MantineProvider } from "@mantine/core"
import { createStore, Provider as AtomProvider } from "jotai"
import * as React from "react"
import { Toaster } from "react-hot-toast"
import { match } from "ts-pattern"

import { appStore, botsStore } from "@/atoms"
import Redirect from "@/components/atoms/Redirect/Redirect"
import TypesafeI18n from "@/i18n/i18n-react"
import type { Locales } from "@/i18n/i18n-types"
import RootLayout from "@/pages/RootLayout/RootLayout"
import { Router } from "@/router"
import { mantineTheme } from "@/theme/mantine.config"

import * as css from "./App.css"

const Bot = React.lazy(() => import("@/pages/BotArea/BotArea"))
const NotFound = React.lazy(() => import("@/pages/NotFound/NotFound"))

const App = ({ locale }: { locale: Locales }) => {
    const route = Router.useRoute(["Home", "BotArea"])

    return (
        <React.StrictMode>
            <TypesafeI18n locale={locale}>
                <MantineProvider theme={{ ...mantineTheme, colorScheme: "light" }}>
                    <AtomProvider store={appStore}>
                        <Toaster />
                        <div className={css.container}>
                            <React.Suspense fallback={<RootLayout navHeader={<small>Loading...</small>} />}>
                                {React.useMemo(
                                    () =>
                                        match(route)
                                            .with({ name: "Home" }, () => <Redirect to="/bots/ChatGPT" />)
                                            .with({ name: "BotArea" }, ({ params }) => (
                                                <AtomProvider store={botsStore.get(params.botName) ?? createStore()}>
                                                    <Bot botName={params.botName} />
                                                </AtomProvider>
                                            ))
                                            .otherwise(() => <NotFound />),
                                    [route],
                                )}
                            </React.Suspense>
                        </div>
                    </AtomProvider>
                </MantineProvider>
            </TypesafeI18n>
        </React.StrictMode>
    )
}

export default App
