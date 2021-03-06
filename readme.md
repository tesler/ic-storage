# IronClad Storage

## Build
```sh
$ npm install
$ npm run build
```

or

```sh
$ yarn install
$ yarn build
```

## Usage
```ts
import { set, get, remove } from 'ic-storage';

const currentDate = new Date();
const expiresAt = currentDate.setMonth(currentDate.getMonth() + 1);

set('key', 'value', expiresAt);
get('key'); // if expired => undefined
remove('key');
```

Select storages

```ts
import { set, get, remove, StorageTypes } from 'ic-storage';

set('key', 'value', expiresAt, [StorageTypes.INDEXED_DB_STORE, StorageTypes.COOKIE_STORE]);
get('key', [StorageTypes.INDEXED_DB_STORE, StorageTypes.COOKIE_STORE]);
remove('key', [StorageTypes.INDEXED_DB_STORE, StorageTypes.COOKIE_STORE]);
```
