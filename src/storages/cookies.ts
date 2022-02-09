import Cookies from 'js-cookie';

import type { Storage } from '../types';

const cookies = async (): Promise<Storage> => ({
    async get(key) {
        const value = Cookies.get(key);

        if (value == null) {
            return undefined;
        }

        return value;
    },

    async set(key, value, expiresAt) {
        Cookies.set(key, value, { expires: expiresAt });
    },

    async remove(key) {
        Cookies.remove(key);
    },
});

export default cookies;
