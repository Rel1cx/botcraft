/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Option as O, Result as R } from "@swan-io/boxed";
import type { UseStore } from "idb-keyval";
import { clear, createStore, del, delMany, get, getMany, keys, set, setMany } from "idb-keyval";
import { zipObj } from "rambda";

export type ConfigManagerProps<T> = {
    name: string;
    parse: (data: unknown) => T;
};

export class ConfigManager<T> {
    public parse: (data: unknown) => T;

    #store: UseStore;

    private constructor({ name, parse }: ConfigManagerProps<T>) {
        this.#store = createStore("config", name);
        this.parse = parse;
    }

    public static make<T>(props: ConfigManagerProps<T>) {
        return new ConfigManager(props);
    }

    public async getConfig<K extends Extract<keyof T, string>>(key: K) {
        const val: T[K] | undefined = await get(key, this.#store);
        return O.fromNullable(val);
    }

    public setConfig<K extends Extract<keyof T, string>>(key: K, value: T[K]) {
        return R.fromPromise<void, Error>(set(key, value, this.#store));
    }

    public setConfigMany(data: Partial<T>) {
        return R.fromPromise<void, Error>(setMany(Object.entries(data), this.#store));
    }

    public deleteConfig<K extends Extract<keyof T, string>>(key: K) {
        return R.fromPromise<void, Error>(del(key, this.#store));
    }

    public deleteConfigMany(keys: Extract<keyof T, string>[]) {
        return R.fromPromise<void, Error>(delMany(keys, this.#store));
    }

    public loadConfig() {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        const load = async () => {
            const keyList = await keys<string>(this.#store);
            const valList = await getMany<T[keyof T]>(keyList, this.#store);
            return this.parse(zipObj(keyList, valList));
        };
        return R.fromPromise(load());
    }

    public resetConfig() {
        return R.fromPromise<void, Error>(clear(this.#store));
    }
}
