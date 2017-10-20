// @flow

import React from 'react';
import {
    View,
    ActivityIndicator,
} from 'react-native';

import styles from './styles';
import colors from '../../styles/colors';

type Props = {
    account: Object,
    navigateTo: (data: Object) => void,
};

class Launch extends React.Component<Props, void> {
    componentDidMount() {
        let initialRoute = 'signin';
        if (this.props.account.authorisation.access_token) { // if user is authorised
            initialRoute = 'profile';
        }

        this.props.navigateTo({
            id: initialRoute,
        });
    }

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.centerline }>
                    <ActivityIndicator size='large' color={ colors.gray } />
                </View>
            </View>
        );
    }
}

export default Launch;
