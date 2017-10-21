// @flow

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import { Lexeme } from '../../components';
import styles from './styles';

type Props = {
    text: string,
    onPress: () => void,
    type?: string,
    disabled?: boolean,
    loading?: boolean,
    loadingColor?: string,
    style: number | number[],
};

class Button extends React.Component<Props, void> {
    static defaultProps = {
        disabled: false,
        loading: false,
        loadingColor: '#FFF',
    };

    render() {
        const {
            text,
            onPress,
            disabled,
            type,
            style,
            loading,
            loadingColor,
        } = this.props;
        let buttonStyle = [
            styles.btn,
            type && styles[`${ type }_btn`],
            disabled && styles.btn_disabled,
        ];

        if (style) {
            if (style instanceof Array) {
                buttonStyle = buttonStyle.concat(style);
            } else {
                buttonStyle.push(style);
            }
        }

        return (
            <TouchableOpacity
                onPress={ onPress }
                style={ buttonStyle }
                activeOpacity={ disabled ? 1 : 0.2 }
            >
                <View>
                    <Text
                        style={ [
                            styles.text,
                            type && styles[`${ type }_text`],
                            disabled && styles.disabled_text,
                            loading && styles.hidden_text,
                        ] }
                    >
                        <Lexeme id={ text } />
                    </Text>
                    { loading && (
                        <View style={ styles.loader }>
                            <ActivityIndicator size='large' color={ loadingColor } />
                        </View>
                    ) }
                </View>
            </TouchableOpacity>
        );
    }
}

const ButtonBlue = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'blue',
    };

    return <Button { ...extendedProps } />;
};

const ButtonGreen = (props: Object) => {
    const extendedProps: Props = {
        ...props,
        type: 'green',
    };

    return <Button { ...extendedProps } />;
};

export {
    Button,
    ButtonBlue,
    ButtonGreen,
};
