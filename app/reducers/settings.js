// @flow

import { settingsConstants } from '../constants';
import { changeLanguage } from '../utils';

const {
    SETTINGS_DEFAULT_SET,
} = settingsConstants;

const DEFAULT = {
    language: 'en',
    lexemes: {},
};

export default (state = DEFAULT, action) => {
    const { type, payload } = action;

    switch (type) {
        case SETTINGS_DEFAULT_SET:
            return {
                ...DEFAULT,
                ...payload,
                lexemes: changeLanguage(),
            };

        default:
            return state;
    }
};
