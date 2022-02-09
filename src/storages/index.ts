import cookieStorage from './cookies';
import indexedDBStorage from './indexedDb';
import localStorageStore from './localStorage';

export const INDEXED_DB_STORE = 'INDEXED_DB_STORE';
export const COOKIE_STORE = 'COOKIE_STORE';
export const LOCAL_STORAGE_STORE = 'LOCAL_STOAGE_STORE';

const storages = {
    [INDEXED_DB_STORE]: indexedDBStorage(),
    [COOKIE_STORE]: cookieStorage(),
    [LOCAL_STORAGE_STORE]: localStorageStore(),
};

export default storages;
