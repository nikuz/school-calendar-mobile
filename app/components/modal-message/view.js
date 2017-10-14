// @flow

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { ButtonBlue } from '../../components';
import styles from './styles';

type Props = {
    text: string,
    close: () => void,
};

class ModalMessage extends React.Component<Props, void> {
    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>{ this.props.text }</Text>
                <View style={ styles.buttons }>
                    <ButtonBlue
                        text='Ok'
                        onPress={ this.props.close }
                    />
                </View>
            </View>
        );
    }
}

export default ModalMessage;
