import { Button } from "@ariakit/react"
import { Input, Select, Slider, TextInput } from "@mantine/core"
import { ArrowLeft } from "@phosphor-icons/react"
import { useAtom } from "jotai"
import * as React from "react"

import type { Model } from "@/api/types"
import { apiKeyAtom, appStore, useBot } from "@/atoms"
import type { MessageData } from "@/bots/builtins/types"
import Icon from "@/components/atoms/Icon/Icon"
import { makeID } from "@/lib/uuid"
import { Router } from "@/router"
import { isModel } from "@/zod"

import { Layout } from "../Layout/Layout"
import * as css from "./styles.css"

const Message = React.lazy(() => import("@/components/atoms/Message/Message"))

const MarkdownEditor = React.lazy(() => import("@/components/atoms/MarkdownEditor/MarkdownEditor"))

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

const dummySystemMessageID = makeID()

const dummyIntroMessageID = makeID()

const Settings = ({ botName }: SettingsProps) => {
    const [bot, setBot] = useBot()
    const [apiKey, setApiKey] = useAtom(apiKeyAtom, { store: appStore })

    const systemMessage = React.useMemo<MessageData>(
        () => ({
            id: dummySystemMessageID,
            role: "system",
            content: bot.systemMessage,
            updatedAt: Date.now(),
        }),
        [bot.systemMessage],
    )

    const introMessage = React.useMemo<MessageData>(
        () => ({
            id: dummyIntroMessageID,
            role: "assistant",
            content: bot.intro,
            updatedAt: Date.now(),
        }),
        [bot.intro],
    )

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
                <div className={css.asideContent}>
                    <h3 className={css.title}>General Settings</h3>
                    <section className={css.section}>
                        <TextInput
                            name="endpoint"
                            label="Endpoint"
                            value="https://api.openai.com/v1/chat/completions"
                            disabled
                        />
                        <TextInput
                            name="apiKey"
                            label="API Key"
                            value={apiKey}
                            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
                                setApiKey(evt.target.value)
                            }}
                        />
                    </section>
                    <h3 className={css.title}>Bot Settings</h3>
                    <section className={css.section}>
                        {/* <TextInput
                        name="botName"
                        label="Bot Name"
                        value={bot.name}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                            setBot((draft) => {
                                draft.name = evt.target.value
                            })
                        }}
                    /> */}
                        <Select
                            label="Model"
                            placeholder="Select model"
                            data={models}
                            value={bot.options.model}
                            onChange={(value) => {
                                if (!value || !isModel(value)) {
                                    return
                                }

                                setBot((draft) => {
                                    draft.options.model = value
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
                        <Input.Wrapper label="System Message">
                            <MarkdownEditor
                                className={css.textarea}
                                defaultValue={bot.systemMessage}
                                placeholder="Write a system message"
                                onChange={(value) => {
                                    setBot((draft) => {
                                        draft.systemMessage = value
                                    })
                                }}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Intro Message">
                            <MarkdownEditor
                                className={css.textarea}
                                placeholder="Write an intro message"
                                defaultValue={bot.intro}
                                onChange={(value) => {
                                    setBot((draft) => {
                                        draft.intro = value
                                    })
                                }}
                            />
                        </Input.Wrapper>
                    </section>
                </div>
            }
        >
            <div className={css.content}>
                <React.Suspense>
                    <Message data={systemMessage} />
                    <Message data={introMessage} />
                </React.Suspense>
            </div>
        </Layout>
    )
}

export default Settings
