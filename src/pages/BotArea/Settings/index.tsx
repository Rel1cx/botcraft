import { TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import type { ChangeEvent } from "react"

import { apiKeyAtom } from "@/stores"

import { Layout } from "../Layout"
import * as css from "./styles.css"

type SettingsProps = {
    botName: string
}

const Settings = ({ botName }: SettingsProps) => {
    const [apiKey, setApiKey] = useAtom(apiKeyAtom)

    return (
        <Layout header={`${botName} Settings`}>
            <div className={css.content}>
                <TextInput
                    name="botName"
                    label="Bot Name"
                    value={botName}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        // setBotName(evt.target.value)
                    }}
                />

                <TextInput name="endpoint" label="Endpoint" value="" disabled />

                <TextInput
                    name="apiKey"
                    label="API Key"
                    value={apiKey}
                    onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                        setApiKey(evt.target.value)
                    }}
                />
            </div>
        </Layout>
    )
}

export default Settings
