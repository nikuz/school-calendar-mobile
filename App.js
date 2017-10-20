// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Text } from 'react-native';
import enLocale from 'react-intl/locale-data/en';
import ruLocale from 'react-intl/locale-data/ru';
// import { Font } from 'expo';
import store from './app/store';
import modelsInit from './app/models';
import Navigator from './app/navigator';

import enMessages from './app/locale-data/en-US.json';
import ruMessages from './app/locale-data/ru-RU.json';

const messages = {
    en: enMessages,
    ru: ruMessages,
};

const locales = {
    en: enLocale,
    ru: ruLocale,
};

type State = {
    appInitiated: boolean,
    lang: string,
};

export default class App extends React.Component<void, State> {
    state = {
        appInitiated: false,
    };

    async componentWillMount() {
        await modelsInit();
        this.changeLanguage();
    }

    changeLanguage() {
        const lang = 'en';
        addLocaleData(locales[lang]);

        this.setState({
            appInitiated: true,
            lang,
        });
    }

    render() {
        if (this.state.appInitiated) {
            const lang = this.state.lang;

            return (
                <IntlProvider
                    locale='en-US'
                    messages={ messages[lang] }
                    textComponent={ Text }
                >
                    <Provider store={ store }>
                        <Navigator />
                    </Provider>
                </IntlProvider>
            );
        }

        return null;
    }
}
