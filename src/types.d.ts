import {
    COOKIE_STORE,
    INDEXED_DB_STORE,
    LOCAL_STORAGE_STORE,
} from './storages';

export type StorageType =
    | typeof INDEXED_DB_STORE
    | typeof COOKIE_STORE
    | typeof LOCAL_STORAGE_STORE;
export type StorageValue = string | Record<string, any>;

export interface Storage {
    get(key: string): Promise<StorageValue | undefined>;
    set(key: string, value: StorageValue, expiresAt: Date): Promise<void>;
    remove(key: string): Promise<void>;
}
