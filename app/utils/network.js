// @flow

import { NetInfo } from 'react-native';

// ----------------
// public methods
// ----------------

export const checkConnect = () => {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().done((connectionType) => {
            switch (connectionType.toUpperCase()) {
                case 'NONE':
                    reject();
                    break;
                default:
                    resolve();
            }
        });
    });
};
