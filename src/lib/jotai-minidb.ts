/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable unicorn/require-post-message-target-origin */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable unicorn/no-useless-undefined */
// https://github.com/11bit/jotai-minidb
import * as idb from "idb-keyval";
import { atom } from "jotai/vanilla";
import { atomFamily } from "jotai/vanilla/utils";
import { atomWithImmer } from "jotai-immer";
import pDefer from "p-defer";
import invariant from "tiny-invariant";
import { match } from "ts-pattern";

type Cache<Item> = Record<string, Item>;
type BroadcastEventUpdate<Item> = {
    type: "UPDATE";
    id: string;
    item: Item;
};
type BroadcastEventDelete = {
    type: "DELETE";
    id: string;
};
type BroadcastEventUpdateMany = {
    type: "UPDATE_MANY";
};
type BroadcastEventMigrationCompleted = {
    type: "MIGRATION_COMPLETED";
};
type BroadcastEvent<Item> =
    | BroadcastEventUpdate<Item>
    | BroadcastEventDelete
    | BroadcastEventUpdateMany
    | BroadcastEventMigrationCompleted;

type MigrateFn = <T = unknown>(previousState: T) => T;
type Migrations = Record<number, MigrateFn>;
type Config = {
    name: string;
    version: number;
    migrations: Migrations;
    onMigrationCompleted: VoidFunction;
    onVersionMissmatch: VoidFunction;
};

type ConfigWithInitialData<Item> = Config & {
    initialData: Record<string, Item>;
};

type Setter<Item> = (oldVal: Item | undefined) => Item;
type ValueOrSetter<Item> = Item | Setter<Item>;

const isSetter = <Item>(value: ValueOrSetter<Item>): value is Setter<Item> => {
    return typeof value === "function";
};

export type DatabaseConfig<Item> = Partial<ConfigWithInitialData<Item>>;

export const DEFAULT_DB_NAME = "jotai-minidb";

const cacheNotInitializedError = "Cache was not initialized";

const DEFAULT_CONFIG: Config = {
    name: DEFAULT_DB_NAME,
    version: 0,
    migrations: {},
    onMigrationCompleted: () => {
        // eslint-disable-next-line no-console
        console.warn("Data has been migrated. Page will be reloaded");
        window.location.reload();
    },
    onVersionMissmatch: () => {
        // ...
    },
};

// eslint-disable-next-line etc/no-misused-generics
const atomWithThenable = <K = void>() => atom(() => pDefer<K>());

const createStore = (
    dbName: string,
    storeName: string,
    initialData: Record<string, unknown>,
): { keyvalStorage: idb.UseStore; metaStorage: idb.UseStore } => {
    const request = indexedDB.open(dbName);
    const initialDataAddRequests: Promise<IDBValidKey>[] = [];
    request.onupgradeneeded = (_) => {
        const objectStore = request.result.createObjectStore(storeName);
        request.result.createObjectStore("_meta");

        for (const [key, value] of Object.entries(initialData)) {
            initialDataAddRequests.push(idb.promisifyRequest(objectStore.add(value, key)));
        }
    };
    const dbp = idb.promisifyRequest(request);

    return {
        keyvalStorage: async (txMode, callback) => {
            const db = await dbp;
            await Promise.all(initialDataAddRequests);
            return callback(db.transaction(storeName, txMode).objectStore(storeName));
        },
        metaStorage: (txMode, callback) =>
            dbp.then((db) => callback(db.transaction("_meta", txMode).objectStore("_meta"))),
    };
};

export class MiniDb<Item> {
    public isInitialized = atom(false);

    public suspendBeforeInit = atom(async (get) => {
        get(this.items);
        await get(this.initialDataThenable).promise;
    });

    public entries = atom((get) => Object.entries(get(this.items) || {}));

    public keys = atom((get) => Object.keys(get(this.items) || {}));

    public values = atom((get) => Object.values(get(this.items) || {}));

    public item = atomFamily((id: string) =>
        atom(
            (get) => get(this.items)?.[id],
            async (_get, set, update: ValueOrSetter<Item>) => {
                await set(this.set, id, update);
            },
        ),
    );

    public set = atom(null, async (get, set, id: string, valueOrSetter: ValueOrSetter<Item>) => {
        if (!get(this.cache)) {
            await get(this.suspendBeforeInit);
        }
        const cache = get(this.cache);
        if (!cache) {
            throw new Error(cacheNotInitializedError); // Should not happen
        }
        const value = isSetter(valueOrSetter) ? valueOrSetter(cache[id]) : valueOrSetter;

        set(this.cache, (draft) => ({
            ...draft,
            [id]: value,
        }));
        await idb.set(id, value, this.idbStorage);
        this.channel.postMessage({ type: "UPDATE", id, item: value });
    });

    public setMany = atom(null, async (get, set, entries: [string, Item][]) => {
        if (!get(this.cache)) {
            await get(this.suspendBeforeInit);
        }

        const data = { ...get(this.cache) };
        for (const [key, val] of entries) {
            data[key] = val;
        }
        set(this.cache, data);
        await idb.setMany(entries, this.idbStorage);
        this.channel.postMessage({ type: "UPDATE_MANY" });
    });

    public delete = atom(null, async (get, set, id: string) => {
        if (!get(this.cache)) {
            await get(this.suspendBeforeInit);
        }
        set(this.cache, (draft) => {
            invariant(draft, cacheNotInitializedError); // Should not happen
            Reflect.deleteProperty(draft, id);
        });
        await idb.del(id, this.idbStorage);
        this.channel.postMessage({ type: "DELETE", id });
    });

    public clear = atom(null, async (get, set) => {
        if (!get(this.cache)) {
            await get(this.suspendBeforeInit);
        }
        set(this.cache, {});
        await idb.clear(this.idbStorage);
        this.channel.postMessage({ type: "UPDATE_MANY" });
    });

    private readonly channel!: BroadcastChannel;

    private readonly cache = atomWithImmer<Cache<Item> | undefined>(undefined);

    private readonly idbStorage: idb.UseStore;

    private readonly metaStorage: idb.UseStore;

    private readonly config: ConfigWithInitialData<Item>;

    // Initialization
    private readonly initStarted = atom(false);

    private readonly initialDataThenable = atomWithThenable();

    public constructor(config: DatabaseConfig<Item> = {}) {
        this.config = { ...DEFAULT_CONFIG, initialData: {}, ...config };
        const { keyvalStorage, metaStorage } = createStore(this.config.name, "key-value", this.config.initialData);
        this.idbStorage = keyvalStorage;
        this.metaStorage = metaStorage;
        this.channel = new BroadcastChannel(`jotai-minidb-broadcast:${this.config.name}`);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering, @typescript-eslint/no-invalid-void-type
    public items = atom<Cache<Item> | undefined, [void], void>(
        (get, { setSelf }) => {
            if (!get(this.initStarted)) {
                void Promise.resolve().then(setSelf);
            }

            return get(this.cache);
        },
        (get, set) => {
            if (!get(this.initStarted)) {
                set(this.initStarted, true);
                void this.preloadData().then((data: Cache<Item>) => {
                    set(this.cache, data);
                    get(this.initialDataThenable).resolve();
                });

                // eslint-disable-next-line unicorn/prefer-add-event-listener
                this.channel.onmessage = async (event: MessageEvent<BroadcastEvent<Item>>) => {
                    const payload = event.data;
                    await match(payload)
                        .with({ type: "UPDATE" }, (payload) => {
                            set(this.cache, (draft) => ({
                                ...draft,
                                [payload.id]: payload.item,
                            }));
                        })
                        .with({ type: "DELETE" }, (payload) => {
                            set(this.cache, (draft) => {
                                invariant(draft, cacheNotInitializedError); // Should not happen
                                Reflect.deleteProperty(draft, payload.id);
                            });
                        })
                        .with({ type: "UPDATE_MANY" }, async () => {
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                            set(this.cache, Object.fromEntries(await idb.entries(this.idbStorage)));
                        })
                        .with({ type: "MIGRATION_COMPLETED" }, async () => {
                            this.config.onMigrationCompleted();
                        })
                        .exhaustive();
                };
            }
        },
    );

    protected async preloadData() {
        await this.migrate();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Object.fromEntries(await idb.entries(this.idbStorage));
    }

    protected async migrate() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const maybeCurrentVersion = await this.metaStorage("readonly", (store) =>
            idb.promisifyRequest(store.get("version")),
        );

        const currentVersion = typeof maybeCurrentVersion === "number" ? maybeCurrentVersion : 0;

        if (this.config.version > currentVersion) {
            let entries = await idb.entries(this.idbStorage);

            for (let ver = currentVersion + 1; ver <= this.config.version; ver++) {
                const migrateFn = this.config.migrations[ver];
                if (!migrateFn) {
                    throw new Error(`Migrate function for version ${ver} is not provided`);
                }
                // eslint-disable-next-line no-await-in-loop
                entries = await Promise.all(
                    entries.map(async ([key, value]) => [key, await migrateFn(value)] as [IDBValidKey, unknown]),
                );
            }

            await idb.setMany(entries, this.idbStorage);

            await this.metaStorage("readwrite", (store) =>
                idb.promisifyRequest(store.put(this.config.version, "version")),
            );

            this.channel.postMessage({ type: "MIGRATION_COMPLETED" });
        } else if (this.config.version < currentVersion) {
            // Old client?
            this.config.onVersionMissmatch();
            throw new Error(
                // eslint-disable-next-line max-len
                `[jotai-minidb] Minimal client version is ${this.config.version} but indexeddb database version is ${currentVersion}`,
            );
        }
    }
}
