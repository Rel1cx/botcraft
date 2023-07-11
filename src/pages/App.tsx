import { MantineProvider } from "@mantine/core";
import * as React from "react";
import { match } from "ts-pattern";

import Redirect from "@/components/atoms/Redirect/Redirect";
import TypesafeI18n from "@/i18n/i18n-react";
import type { Locales } from "@/i18n/i18n-types";
import RootLayout from "@/pages/RootLayout/RootLayout";
import { Router } from "@/router";
import { mantineTheme } from "@/theme/mantine.config";

import * as css from "./App.css";

const BotArea = React.lazy(() => import("@/pages/BotArea/BotArea"));
const NotFound = React.lazy(() => import("@/pages/NotFound/NotFound"));

const App = ({ locale }: { locale: Locales }) => {
    const route = Router.useRoute(["Home", "BotArea", "NotFound"]);

    return (
        <React.StrictMode>
            <TypesafeI18n locale={locale}>
                <MantineProvider theme={{ ...mantineTheme, colorScheme: "light" }}>
                    <div className={css.root}>
                        <React.Suspense fallback={<RootLayout navHeader={<small className={css.loading} />} />}>
                            {React.useMemo(
                                () =>
                                    match(route)
                                        .with({ name: "Home" }, () => <Redirect to="/bots/ChatGPT" />)
                                        .with({ name: "BotArea" }, ({ params }) => <BotArea botName={params.botName} />)
                                        .otherwise(() => <NotFound />),
                                [route],
                            )}
                        </React.Suspense>
                    </div>
                </MantineProvider>
            </TypesafeI18n>
        </React.StrictMode>
    );
};

export default App;
