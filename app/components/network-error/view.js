// @flow

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    Button,
    ButtonBlue,
} from '../../components';
// import * as networkConstants from '../../constants/network';
import styles from './styles';

type Props = {
    close: () => void,
    retryCallback: () => void,
};

class NetworkError extends React.Component<Props, void> {
    retryHandler = () => {
        this.props.modalClose({
            callback: this.props.retryCallback,
        });
    };

    render() {
        return (
            <View style={ styles.container }>
                <View style={ styles.content }>
                    <Text style={ styles.title }>
                        {/*{ networkConstants.NETWORK_ERROR_TEXT }*/}
                    </Text>
                    <Text style={ styles.question_text }>
                        {/*{ networkConstants.NETWORK_ERROR_QUESTION_TEXT }*/}
                    </Text>
                </View>
                <View style={ styles.buttons }>
                    <Button
                        // text={ networkConstants.NETWORK_ERROR_BUTTON_CANCEL_TEXT }
                        text='close'
                        style={ styles.button }
                        onPress={ this.props.close }
                    />
                    <ButtonBlue
                        // text={ networkConstants.NETWORK_ERROR_BUTTON_RETRY_TEXT }
                        text='retry'
                        style={ styles.button }
                        onPress={ this.retryHandler }
                    />
                </View>
            </View>
        );
    }
}

export default NetworkError;
