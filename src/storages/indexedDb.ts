import {
    createStore,
    set as idbSet,
    get as idbGet,
    del as idbDelete,
    UseStore,
} from 'idb-keyval';

import type { Storage } from '../types';

const mockedIndexedDbStorage: Storage = {
    async get() {
        return undefined;
    },
    async set() {},
    async remove() {},
};

const indexedDb = async (): Promise<Storage> => {
    let store: UseStore;

    try {
        store = createStore('test', 'store');
    } catch (error) {
        return mockedIndexedDbStorage;
    }

    return {
        async get(key) {
            const storageValue = await idbGet<{
                value: any;
                expiresAt: string;
            }>(key, store);

            if (storageValue == null) {
                return undefined;
            }

            const { value, expiresAt } = storageValue;

            if (new Date(expiresAt) < new Date()) {
                await idbDelete(key, store);
                return undefined;
            }

            return value;
        },

        async set(key, value, expiresAt) {
            await idbSet(key, { value, expiresAt: expiresAt.getTime() }, store);
        },

        async remove(key) {
            await idbDelete(key, store);
        },
    };
};

export default indexedDb;
