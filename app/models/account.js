import * as storage from '../utils/storage';

const storageCollectionName = 'account';

// ----------------
// public methods
// ----------------

export const get = async () => storage.get(storageCollectionName);

export const set = async (data) => storage.set(storageCollectionName, data);

export const getAuthorisation = async () => {
    const account = await storage.get(storageCollectionName);
    return account.authorisation;
};

export const setAuthorisation = async (data) => {
    const account = await storage.get(storageCollectionName) || {};
    account.authorisation = data;

    return storage.set(storageCollectionName, account);
};
