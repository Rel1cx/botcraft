import { MantineProvider } from "@mantine/core"
import { lazy, StrictMode, Suspense, useMemo } from "react"
import { match } from "ts-pattern"

import Redirect from "@/components/atoms/Redirect"
import TypesafeI18n from "@/i18n/i18n-react"
import RootLayout from "@/pages/RootLayout"
import { Router } from "@/router"
import { mantineTheme } from "@/theme/mantine.config"

import * as css from "./App.css"

const Bot = lazy(() => import("@/pages/BotArea"))
const NotFound = lazy(() => import("@/pages/NotFound"))

const App = () => {
    const route = Router.useRoute(["Home", "BotArea"])

    return (
        <StrictMode>
            <TypesafeI18n locale="en">
                <MantineProvider theme={{ ...mantineTheme, colorScheme: "light" }}>
                    <div className={css.container}>
                        <Suspense fallback={<RootLayout navHeader={<small>Loading...</small>} />}>
                            {useMemo(
                                () =>
                                    match(route)
                                        // TODO: Add a Home page
                                        .with({ name: "Home" }, () => <Redirect to="/bots/ChatGPT" />)
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
