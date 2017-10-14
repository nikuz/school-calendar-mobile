// @flow

import { AsyncStorage } from 'react-native';
import { config } from '../constants';

const getCollectionName = (name) => (
    `${ config.STORAGE_PREFIX }:${ name }`
);

// AsyncStorage.clear();

// ----------------
// public methods
// ----------------

async function get(name: string | string[]) {
    let result = {};
    if (Array.isArray(name)) {
        const data = await AsyncStorage.multiGet(name.map(getCollectionName));

        data.forEach(item => {
            const name = item[0].replace(`${ config.STORAGE_PREFIX }:`, '');
            result[name] = item[1];
            try {
                result[name] = JSON.parse(item[1]);
            } catch (err) {
                // I want application to not crush, but don't care about the message
            }
        });
    } else {
        result = await AsyncStorage.getItem(getCollectionName(name));
        try {
            result = JSON.parse(result);
        } catch (err) {
            // I want application to not crush, but don't care about the message
        }
    }
    return result;
}

async function set(name: string | Object, data: string | number | Object | Array<*> | Date) {
    let result = data;

    if (typeof data.getMonth === 'function') { // check if Date
        result = item.toString();
    } else if (typeof data === 'object') {
        result = JSON.stringify(item);
    } else {
        result = String(data);
    }

    return AsyncStorage.setItem(getCollectionName(name), result);
}

async function remove(name: string | string[]) {
    if (Array.isArray(name)) {
        return AsyncStorage.multiRemove(name.map(getCollectionName));
    }

    return AsyncStorage.removeItem(getCollectionName(name));
}

// ---------
// interface
// ---------

export {
    get,
    set,
    remove,
};
