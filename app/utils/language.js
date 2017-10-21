// @flow

import messages from '../locale-data';

const DEFAULT_LANGUAGE = 'en';

const change = (language) => {
    const defaultMessages = messages[DEFAULT_LANGUAGE];
    const languageMessages = Object.assign({}, messages[language] || defaultMessages);

    Object.keys(defaultMessages).forEach(item => {
        if (!languageMessages[item]) {
            languageMessages[item] = defaultMessages[item];
        }
    });

    return languageMessages;
};

export default change;
