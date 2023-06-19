/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Option as O, Result as R } from "@swan-io/boxed"
import type { UseStore } from "idb-keyval"
import { clear, createStore, del, delMany, get, getMany, keys, set, setMany } from "idb-keyval"
import { zipObj } from "rambda"

import type { IDProtocol, NameProtocol } from "@/protocols"

export type DBProps = IDProtocol & NameProtocol

export class DB<T> {
    #store: UseStore

    private constructor({ id, name }: DBProps) {
        this.#store = createStore(id, name)
    }

    // eslint-disable-next-line etc/no-misused-generics
    static make<T>(props: DBProps) {
        return new DB<T>(props)
    }

    async get(key: string): Promise<O<T>> {
        const val: T | undefined = await get(key, this.#store)
        return O.fromNullable(val)
    }

    async getMany(keys: string[]): Promise<O<T[]>> {
        const valList: T[] = await getMany(keys, this.#store)
        return O.fromNullable(valList)
    }

    set(key: string, value: T): Promise<R<void, Error>> {
        return R.fromPromise<void, Error>(set(key, value, this.#store))
    }

    setMany(entries: [string, T][]): Promise<R<void, Error>> {
        return R.fromPromise<void, Error>(setMany(entries, this.#store))
    }

    delete(key: string): Promise<R<void, Error>> {
        return R.fromPromise<void, Error>(del(key, this.#store))
    }

    deleteMany(keys: string[]): Promise<R<void, Error>> {
        return R.fromPromise<void, Error>(delMany(keys, this.#store))
    }

    async load(): Promise<R<Record<string, T>, Error>> {
        const keyList = await keys<string>(this.#store)
        const valList = await getMany<T>(keyList, this.#store)
        return R.fromExecution(() => zipObj(keyList, valList))
    }

    async clear(): Promise<R<void, Error>> {
        return R.fromPromise<void, Error>(clear(this.#store))
    }

    async size(): Promise<R<number, Error>> {
        return R.fromPromise<number, Error>(keys(this.#store).then((keys) => keys.length))
    }
}
