// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import colors from '../../styles/colors';
import styles from './styles';

type Props = {
    lexemes: Object,
    value: string,
    placeholder: string | ReactComponent,
    placeholderColor?: string,
    onChange: () => void,
    secureTextEntry?: boolean,
    autoCorrect?: boolean,
    keyboardType?: string,
    autoFocus?: boolean,
    disabled?: boolean,
    scrollContainer?: ReactComponent,
    style?: number | number[],
    containerStyle?: number | number[],
    enablesReturnKeyAutomatically?: boolean,
    returnKeyType?: string,
    clearButtonMode?: string,
    intl: Object,
};

class TextField extends React.Component<Props, void> {
    static defaultProps = {
        secureTextEntry: false,
        autoCorrect: true,
        keyboardType: 'default',
        autoFocus: false,
        scrollContainer: null,
        disabled: false,
        style: null,
        containerStyle: null,
        enablesReturnKeyAutomatically: true,
        returnKeyType: 'next',
        placeholderColor: colors.gray,
        clearButtonMode: 'never',
    };

    onFocus = () => {
        if (this.props.scrollContainer) {
            this.props.scrollContainer.scrollToElement(this.field);
        }
    };

    fieldFocus = () => {
        this.field.focus();
    };

    render() {
        const {
            value,
            placeholderColor,
            disabled,
            keyboardType,
            style,
            enablesReturnKeyAutomatically,
            returnKeyType,
            secureTextEntry,
            autoCorrect,
            autoFocus,
            clearButtonMode,
            lexemes,
        } = this.props;
        const additionalContainerStyle = this.props.containerStyle;
        let placeholder = this.props.placeholder;
        const isCustomPlaceholder = typeof placeholder === 'object';

        if (!isCustomPlaceholder) {
            placeholder = lexemes[placeholder];
        }

        let containerStyle = [
            styles.container,
        ];
        if (additionalContainerStyle) {
            if (additionalContainerStyle instanceof Array) {
                containerStyle = containerStyle.concat(additionalContainerStyle);
            } else {
                containerStyle.push(additionalContainerStyle);
            }
        }

        let fieldStyle = [
            styles.field,
            disabled && styles.field_disabled,
        ];
        if (style) {
            if (style instanceof Array) {
                fieldStyle = fieldStyle.concat(style);
            } else {
                fieldStyle.push(style);
            }
        }

        return (
            <View style={ containerStyle }>
                <TextInput
                    ref={ el => this.field = el }
                    value={ value }
                    placeholder={ isCustomPlaceholder ? '' : placeholder }
                    placeholderTextColor={ placeholderColor }
                    editable={ !disabled }
                    style={ fieldStyle }
                    keyboardType={ keyboardType }
                    onChangeText={ this.props.onChange }
                    onFocus={ this.onFocus }
                    onSubmitEditing={ this.onSubmitEditing }
                    enablesReturnKeyAutomatically={ enablesReturnKeyAutomatically }
                    underlineColorAndroid='transparent'
                    returnKeyType={ returnKeyType }
                    autoFocus={ autoFocus }
                    secureTextEntry={ secureTextEntry }
                    autoCorrect={ autoCorrect }
                    clearButtonMode={ clearButtonMode }
                />
                { isCustomPlaceholder && value.length === 0 && (
                    <TouchableOpacity
                        onPress={ this.fieldFocus }
                        style={ styles.custom_placeholder }
                        activeOpacity={ 1 }
                    >
                        { placeholder }
                    </TouchableOpacity>
                ) }
            </View>
        );
    }
}

export default connect((state: Object) => ({
    lexemes: state.settings.lexemes,
}), null)(TextField);
