// @flow

import React from 'react';
import { View, Text } from 'react-native';
import {
    ButtonBlue,
    TextInput,
    Link,
    NetworkError,
    Error,
} from '../../../components';
import * as accountConstants from '../../../constants/account';
import styles from '../styles';

type Props = {
    account: Object,
    scrollContainer: Object,
    signInClickHandler: () => void,
    // modalOpen: PropTypes.func.isRequired,
    restorePassword: (email: string) => void,
};

type State = {
    email: string,
    submitDisabled: boolean,
};

class ForgotPassword extends React.Component<Props, State> {
    state = {
        email: '',
        submitDisabled: true,
    };

    componentWillReceiveProps(newProps) {
        if (
            newProps.account.forgot_password_network_error
            && !this.props.account.forgot_password_network_error
        ) {
            this.props.modalOpen({
                content: (
                    <NetworkError retryCallback={ this.submit } />
                ),
            });
        }
        if (newProps.account.forgot_password_error && !this.props.account.forgot_password_error) {
            this.props.modalOpen({
                content: <Error text={ accountConstants.ACCOUNT_FORGOT_PASSWORD_ERROR_TEXT } />,
            });
        }
    }

    emailOnChange = (value) => {
        const email = value.trim();
        this.setState({
            email,
            submitDisabled: email.length === 0,
        });
    };

    submit = () => {
        if (this.props.account.forgot_password_loading || this.state.submitDisabled) {
            return;
        }
        this.props.restorePassword(this.state.email);
    };

    render() {
        const {
            email,
            submitDisabled,
        } = this.state;
        const {
            scrollContainer,
            account,
        } = this.props;

        return (
            <View>
                { account.forgot_password_success ?
                    <View>
                        <Text style={ styles.forgot_password_title }>
                            { accountConstants.ACCOUNT_FORGOT_PASSWORD_SUCCESS_TITLE_TEXT }
                        </Text>
                        <Text style={ styles.forgot_password_text }>
                            { accountConstants.ACCOUNT_FORGOT_PASSWORD_SUCCESS_TEXT }
                        </Text>
                    </View>
                    :
                    <View>
                        <TextInput
                            value={ email }
                            placeholder={ accountConstants.ACCOUNT_FORGOT_PASSWORD_EMAIL_TEXT }
                            autoCorrect={ false }
                            keyboardType='email-address'
                            autoFocus={ true }
                            onChange={ this.emailOnChange }
                            scrollContainer={ scrollContainer }
                        />
                        <ButtonBlue
                            style={ styles.submit_btn }
                            text={ accountConstants.ACCOUNT_FORGOT_PASSWORD_SUBMIT_BUTTON_TEXT }
                            loading={ account.forgot_password_loading }
                            disabled={ submitDisabled }
                            onPress={ this.submit }
                        />
                    </View>
                }
                <View style={ styles.links_wrapper }>
                    <Link
                        text={ accountConstants.ACCOUNT_SIGN_IN_SUBMIT_BUTTON_TEXT }
                        style={ styles.link }
                        onPress={ this.props.signInClickHandler }
                    />
                </View>
            </View>
        );
    }
}

export default ForgotPassword;
