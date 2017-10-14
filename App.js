import React from 'react';
import { Provider } from 'react-redux';
// import { Font } from 'expo';
import store from './app/store';
import modelsInit from './app/models';
import Navigator from './app/navigator';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            appInitiated: false,
        };
    }
    async componentWillMount() {
        await modelsInit();
        this.setState({
            appInitiated: true,
        })
    }

    render() {
        if (this.state.appInitiated) {
            return (
                <Provider store={store}>
                    <Navigator />
                </Provider>
            );
        }

        return null;
    }
}
