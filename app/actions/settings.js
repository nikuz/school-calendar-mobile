// @flow

import { settingsConstants } from '../constants';

const {
    SETTINGS_DEFAULT_SET,
} = settingsConstants;

export const defaultSet = (data) => ({
    type: SETTINGS_DEFAULT_SET,
    payload: data,
});
