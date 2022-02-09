import type { Storage } from '../types';

const ls = async (): Promise<Storage> => ({
    async get(key) {
        const lsValue = localStorage.getItem(key);

        if (lsValue == null) {
            return undefined;
        }

        const { value, expiresAt } = JSON.parse(lsValue);

        if (new Date(expiresAt) < new Date()) {
            localStorage.removeItem(key);
            return undefined;
        }

        return value;
    },

    async set(key, value, expiresAt) {
        localStorage.setItem(key, JSON.stringify({ value, expiresAt }));
    },

    async remove(key) {
        localStorage.removeItem(key);
    },
});

export default ls;
