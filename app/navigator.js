// @flow

import React from 'react';
import { View, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';
import store from './store';
import * as navigatorActions from './actions/navigator';
import colors from './styles/colors';

import Launcher from './scenes/launcher';
import Login from './scenes/login';
import Modal from './components/modal';

const headerStyle = {
    backgroundColor: colors.header_bg,
};

const sceneStyle = {
    backgroundColor: colors.bg,
};

const AppNavigator = StackNavigator({
    launcher: {
        screen: Launcher,
        navigationOptions: {
            gesturesEnabled: true,
            header: null,
        },
    },
    login: {
        screen: Login,
        navigationOptions: {
            gesturesEnabled: true,
            headerStyle,
        },
    },
}, {
    cardStyle: sceneStyle,
    onTransitionEnd: function() { // eslint-disable-line object-shorthand
        store.dispatch(
            navigatorActions.transitionOnStop(this.navigation.state.routes)
        );
    },
});

type Props = {
    navigator: Object,
};

class AppWithNavigationState extends React.Component<Props, void> {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            if (this.navigator.state.nav.index !== 0) {
                store.dispatch(
                    navigatorActions.pop()
                );
                return true;
            }

            return BackHandler.exitApp();
        });
    }

    componentWillReceiveProps(nextProps) {
        const operationType = nextProps.navigator.type;

        switch (operationType) {
            case 'pop':
                this.navigator.dispatch(
                    NavigationActions.back()
                );
                break;
            case 'replace':
                this.navigator.dispatch(
                    NavigationActions.reset({
                        index: this.navigator.state.nav.index,
                        actions: [
                            NavigationActions.navigate({
                                routeName: nextProps.navigator.id,
                            }),
                        ],
                    })
                );
                break;
            default: // push
                this.navigator.dispatch(
                    NavigationActions.navigate({ routeName: nextProps.navigator.id })
                );
                break;
        }
    }

    shouldComponentUpdate = () => false;

    render() {
        return (
            <View style={ { flex: 1 } }>
                <AppNavigator ref={ el => this.navigator = el } />
                <Modal />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    navigator: state.navigator,
});

export default connect(mapStateToProps)(AppWithNavigationState);
