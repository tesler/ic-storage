import storages, {
    COOKIE_STORE,
    INDEXED_DB_STORE,
    LOCAL_STORAGE_STORE,
} from './storages';
import { addMonthToDate } from './utils';
import type { StorageType, StorageValue } from './types';

const getDefaultExpiresAt = () => addMonthToDate(new Date(), 1);

export const StorageTypes = {
    COOKIE_STORE,
    INDEXED_DB_STORE,
    LOCAL_STORAGE_STORE,
};

export const get = async <ValueType = StorageValue | undefined>(
    key: string,
    storageTypes: StorageType[] = [
        INDEXED_DB_STORE,
        COOKIE_STORE,
        LOCAL_STORAGE_STORE,
    ],
): Promise<ValueType> => {
    const values = await Promise.all(
        storageTypes.map(async (storageType) => {
            const storage = await storages[storageType];
            return storage.get(key);
        }),
    );

    const filteredValues = values.filter((value) => value != null);

    return filteredValues[0] as ValueType;
};

export const set = async (
    key: string,
    value: any,
    expiresAt: Date = getDefaultExpiresAt(),
    storageTypes: StorageType[] = [
        INDEXED_DB_STORE,
        COOKIE_STORE,
        LOCAL_STORAGE_STORE,
    ],
): Promise<void> => {
    await Promise.all(
        storageTypes.map(async (storageType) => {
            const storage = await storages[storageType];
            return storage.set(key, value, expiresAt);
        }),
    );
};

export const remove = async (
    key: string,
    storageTypes: StorageType[] = [
        INDEXED_DB_STORE,
        COOKIE_STORE,
        LOCAL_STORAGE_STORE,
    ],
): Promise<void> => {
    await Promise.all(
        storageTypes.map(async (storageType) => {
            const storage = await storages[storageType];
            return storage.remove(key);
        }),
    );
};
