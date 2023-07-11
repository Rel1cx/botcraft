import { Button } from "@ariakit/react";
import { Input, Select, Slider, TextInput } from "@mantine/core";
import { ArrowLeft } from "@phosphor-icons/react";
import { from, toNumber } from "dnum";
import { produce } from "immer";
import { useAtom } from "jotai";
import * as React from "react";

import type { Model } from "@/api";
import type { MessageData } from "@/bot/types";
import Icon from "@/components/atoms/Icon/Icon";
import type { Locales } from "@/i18n/i18n-types";
import { isLocale } from "@/i18n/i18n-util";
import { Router } from "@/router";
import { apiKeyAtom, endpointAtom, titleLocaleAtom, useBot } from "@/stores";
import type { Role } from "@/zod";
import { isModel } from "@/zod";

import { Layout } from "../Layout/Layout";
import * as css from "./styles.css";

const Message = React.lazy(() => import("@/components/Message/Message"));

const TextEditor = React.lazy(() => import("@/components/atoms/TextEditor/TextEditor"));

type BotSettingsProps = {
    botName: string;
};

const models: { value: Model; label: Model }[] = [
    { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { value: "gpt-3.5-turbo-0613", label: "gpt-3.5-turbo-0613" },
    { value: "gpt-3.5-turbo-16k", label: "gpt-3.5-turbo-16k" },
    { value: "gpt-3.5-turbo-16k-0613", label: "gpt-3.5-turbo-16k-0613" },
    { value: "gpt-4", label: "gpt-4" },
    { value: "gpt-4-0613", label: "gpt-4-0613" },
    { value: "gpt-4-32k", label: "gpt-4-32k" },
    { value: "gpt-4-32k-0613", label: "gpt-4-32k-0613" },
];

const titleLocales: { value: Locales; label: string }[] = [
    { value: "en", label: "English" },
    { value: "zh-CN", label: "简体中文" },
];

const ChatMessagePresenter = React.memo(({ content, role }: { role: Role; content: string }) => {
    const dummyID = React.useId();

    const data = React.useMemo<MessageData>(
        () => ({
            id: `msg-${dummyID}`,
            role,
            content,
            updatedAt: Date.now(),
        }),
        [content, dummyID, role],
    );

    if (!content) {
        return null;
    }

    return (
        <React.Suspense>
            <Message data={data} showMenu={false} />
        </React.Suspense>
    );
});

const BotSettings = ({ botName }: BotSettingsProps) => {
    const [bot, setBot] = useBot(botName);
    const [apiKey, setApiKey] = useAtom(apiKeyAtom);
    const [endpoint, setEndpoint] = useAtom(endpointAtom);
    const [titleLocale, setTitleLocale] = useAtom(titleLocaleAtom);

    if (!bot) {
        return null;
    }

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
                            Router.push("BotRoot", { botName });
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
                            name="apiKey"
                            label="API Key"
                            value={apiKey}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                setApiKey(ev.target.value);
                            }}
                        />
                        <TextInput
                            name="endpoint"
                            label="Endpoint"
                            value={endpoint}
                            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                                setEndpoint(ev.target.value);
                            }}
                        />
                        <Select
                            label="Title Language"
                            placeholder="Select language"
                            data={titleLocales}
                            value={titleLocale}
                            onChange={(value) => {
                                if (!value || !isLocale(value)) {
                                    return;
                                }
                                setTitleLocale(value);
                            }}
                        />
                    </section>
                    <h3 className={css.title}>Bot Settings</h3>
                    <section className={css.section}>
                        {/* <TextInput
                        name="botName"
                        label="Bot Name"
                        value={bot.name}
                        onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                            setBot((draft) => {
                                draft.name = ev.target.value
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
                                    return;
                                }
                                void setBot(
                                    produce((draft) => {
                                        if (!draft) {
                                            return;
                                        }
                                        draft.options.model = value;
                                    }),
                                );
                            }}
                        />
                        <Input.Wrapper label="Temperature">
                            <Slider
                                labelAlwaysOn
                                value={bot.options.temperature}
                                onChange={(value) => {
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.options.temperature = toNumber(from(value), 1);
                                        }),
                                    );
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
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.options.max_tokens = toNumber(from(value), 0);
                                        }),
                                    );
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
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.options.frequency_penalty = toNumber(from(value), 1);
                                        }),
                                    );
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
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.options.presence_penalty = toNumber(from(value), 1);
                                        }),
                                    );
                                }}
                                min={0}
                                max={1}
                                step={0.1}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="System Message">
                            <TextEditor
                                className={css.textarea}
                                value={bot.systemMessage}
                                placeholder="Write a system message"
                                onChange={(value) => {
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.systemMessage = value;
                                        }),
                                    );
                                }}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label="Intro Message">
                            <TextEditor
                                className={css.textarea}
                                placeholder="Write an intro message"
                                value={bot.intro}
                                onChange={(value) => {
                                    void setBot(
                                        produce((draft) => {
                                            if (!draft) {
                                                return;
                                            }
                                            draft.intro = value;
                                        }),
                                    );
                                }}
                            />
                        </Input.Wrapper>
                    </section>
                </div>
            }
        >
            <div className={css.content}>
                <ChatMessagePresenter role="system" content={bot.systemMessage} />
                <ChatMessagePresenter role="assistant" content={bot.intro} />
            </div>
        </Layout>
    );
};

export default BotSettings;
