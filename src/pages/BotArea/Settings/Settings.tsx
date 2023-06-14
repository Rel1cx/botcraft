import { Select, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import type { ChangeEvent } from "react"

import type { Model } from "@/api/types"
import { apiKeyAtom } from "@/stores"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

type SettingsProps = {
    botName: string
}

const models: { value: Model }[] = [
    { value: "gpt-3.5-turbo" },
    { value: "gpt-3.5-turbo-0613" },
    { value: "gpt-3.5-turbo-16k" },
    { value: "gpt-3.5-turbo-16k-0613" },
    { value: "gpt-4" },
    { value: "gpt-4-0613" },
    { value: "gpt-4-32k" },
    { value: "gpt-4-32k-0613" },
]

const Settings = ({ botName }: SettingsProps) => {
    const [apiKey, setApiKey] = useAtom(apiKeyAtom)

    return (
        <Layout
            header={`${botName} Settings`}
            aside={
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

                    <Select label="Model" placeholder="Select model" data={models} />
                </div>
            }
        >
            TODO: Context and Prompt settings
        </Layout>
    )
}

export default Settings
