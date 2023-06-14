import { Button } from "@ariakit/react"
import { Input, Select, Slider, TextInput } from "@mantine/core"
import { useAtom } from "jotai"
import { ArrowLeft } from "lucide-react"
import type { ChangeEvent } from "react"

import type { Model } from "@/api/types"
import Icon from "@/components/atoms/Icon/Icon"
import { Router } from "@/router"
import { apiKeyAtom, defaultBotAtom } from "@/stores"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

type SettingsProps = {
    botName: string
}

const models: { value: Model; label: Model }[] = [
    { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { value: "gpt-3.5-turbo-0613", label: "gpt-3.5-turbo-0613" },
    { value: "gpt-3.5-turbo-16k", label: "gpt-3.5-turbo-16k" },
    { value: "gpt-3.5-turbo-16k-0613", label: "gpt-3.5-turbo-16k-0613" },
    { value: "gpt-4", label: "gpt-4" },
    { value: "gpt-4-0613", label: "gpt-4-0613" },
    { value: "gpt-4-32k", label: "gpt-4-32k" },
    { value: "gpt-4-32k-0613", label: "gpt-4-32k-0613" },
]

const Settings = ({ botName }: SettingsProps) => {
    const [bot, setBot] = useAtom(defaultBotAtom)
    const [apiKey, setApiKey] = useAtom(apiKeyAtom)

    return (
        <Layout
            header={`${botName} Settings`}
            asideHeader={
                <div className={css.asideHeader}>
                    <Button
                        className={css.button}
                        as="button"
                        clickOnEnter
                        clickOnSpace
                        onClick={() => {
                            Router.push("BotRoot", { botName })
                        }}
                    >
                        <Icon as={ArrowLeft} />
                    </Button>
                </div>
            }
            aside={
                <div className={css.content}>
                    <TextInput
                        name="botName"
                        label="Bot Name"
                        value={bot.name}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                            setBot((draft) => {
                                draft.name = evt.target.value
                            })
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
                    <Select
                        label="Model"
                        placeholder="Select model"
                        data={models}
                        value={bot.options.model}
                        onChange={(value) => {
                            if (!value) {
                                return
                            }

                            setBot((draft) => {
                                draft.options.model = value as Model
                            })
                        }}
                    />
                    <Input.Wrapper label="Temperature">
                        <Slider
                            labelAlwaysOn
                            value={bot.options.temperature}
                            onChange={(value) => {
                                setBot((draft) => {
                                    draft.options.temperature = Number.parseFloat(value.toPrecision(2))
                                })
                            }}
                            min={0}
                            max={2}
                            step={0.1}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Max Tokens">
                        <Slider
                            labelAlwaysOn
                            value={bot.options.max_tokens}
                            onChange={(value) => {
                                setBot((draft) => {
                                    draft.options.max_tokens = value
                                })
                            }}
                            min={100}
                            max={16384}
                            step={1}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Frequency Penalty">
                        <Slider
                            labelAlwaysOn={bot.options.frequency_penalty !== 0}
                            value={bot.options.frequency_penalty}
                            onChange={(value) => {
                                setBot((draft) => {
                                    draft.options.frequency_penalty = Number.parseFloat(value.toPrecision(2))
                                })
                            }}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </Input.Wrapper>
                    <Input.Wrapper label="Presence Penalty">
                        <Slider
                            labelAlwaysOn={bot.options.presence_penalty !== 0}
                            value={bot.options.presence_penalty}
                            onChange={(value) => {
                                setBot((draft) => {
                                    draft.options.presence_penalty = Number.parseFloat(value.toPrecision(2))
                                })
                            }}
                            min={0}
                            max={1}
                            step={0.1}
                        />
                    </Input.Wrapper>
                </div>
            }
        >
            TODO: Context and Prompt settings
        </Layout>
    )
}

export default Settings
