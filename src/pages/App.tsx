import { MantineProvider } from "@mantine/core"
import { lazy, StrictMode, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import { defaultBot } from "@/bots"
import Redirect from "@/components/atoms/Redirect/Redirect"
import TypesafeI18n from "@/i18n/i18n-react"
import type { Locales } from "@/i18n/i18n-types"
import RootLayout from "@/pages/RootLayout/RootLayout"
import { Router } from "@/router"
import { mantineTheme } from "@/theme/mantine.config"

import * as css from "./App.css"

const Bot = lazy(() => import("@/pages/BotArea/BotArea"))
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"))

const App = ({ locale }: { locale: Locales }) => {
    const route = Router.useRoute(["Home", "BotArea"])

    return (
        <StrictMode>
            <TypesafeI18n locale={locale}>
                <MantineProvider theme={{ ...mantineTheme, colorScheme: "light" }}>
                    <div className={css.container}>
                        <Suspense fallback={<RootLayout navHeader={<small>Loading...</small>} />}>
                            {useMemo(
                                () =>
                                    match(route)
                                        .with({ name: "Home" }, () => <Redirect to={`/bots/${defaultBot.name}`} />)
                                        .with({ name: "BotArea" }, ({ params }) => <Bot botName={params.botName} />)
                                        .otherwise(() => <NotFound />),
                                [route],
                            )}
                        </Suspense>
                    </div>
                </MantineProvider>
            </TypesafeI18n>
        </StrictMode>
    )
}

export default App
