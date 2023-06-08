/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Option as O, Result as R } from "@swan-io/boxed"
import type { UseStore } from "idb-keyval"
import { clear, createStore, del, delMany, get, getMany, keys, set, setMany } from "idb-keyval"
import { zipObj } from "rambda"

export type ConfigManagerProps<T> = {
    name: string
    parse: (data: unknown) => T
}

export class ConfigManager<T> {
    parse: (data: unknown) => T

    #store: UseStore

    private constructor({ name, parse }: ConfigManagerProps<T>) {
        this.#store = createStore("config", name)
        this.parse = parse
    }

    static make<T>(props: ConfigManagerProps<T>) {
        return new ConfigManager(props)
    }

    async getConfig<K extends Extract<keyof T, string>>(key: K) {
        const val: T[K] | undefined = await get(key, this.#store)
        return O.fromNullable(val)
    }

    setConfig<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
        return R.fromPromise<void, Error>(set(key, value, this.#store))
    }

    setConfigMany(data: Partial<T>) {
        return R.fromPromise<void, Error>(setMany(Object.entries(data), this.#store))
    }

    deleteConfig<K extends Extract<keyof T, string>>(key: K) {
        return R.fromPromise<void, Error>(del(key, this.#store))
    }

    deleteConfigMany(keys: Extract<keyof T, string>[]) {
        return R.fromPromise<void, Error>(delMany(keys, this.#store))
    }

    loadConfig() {
        const load = async () => {
            const keyList = await keys<string>(this.#store)
            const valList = await getMany<T[keyof T]>(keyList, this.#store)
            return this.parse(zipObj(keyList, valList))
        }
        return R.fromPromise(load())
    }

    resetConfig() {
        return R.fromPromise<void, Error>(clear(this.#store))
    }
}
