// @flow

import React from 'react';
import { View } from 'react-native';
import {
    ButtonBlue,
    TextInput,
    Link,
    // NetworkError,
    // Error,
} from '../../../components';
import * as accountConstants from '../../../constants/account';
import styles from '../styles';

type Props = {
    account: Object,
    scrollContainer: Object,
    forgotPasswordClickHandler: () => void,
    signIn: (email: string, password: string) => void,
    // modalOpen: PropTypes.func.isRequired,
    signUpClickHandler: () => void,
};

type State = {
    login: string,
    password: string,
    submitDisabled: boolean,
};

class SignIn extends React.Component<Props, State> {
    state = {
        login: '',
        password: '',
        submitDisabled: true,
    };

    componentWillReceiveProps(newProps) {
        if (newProps.account.sign_in_network_error && !this.props.account.sign_in_network_error) {
            // this.props.modalOpen({
            //     content: (
            //         <NetworkError retryCallback={ this.submit } />
            //     ),
            // });
        }
        if (newProps.account.sign_in_error && !this.props.account.sign_in_error) {
            // this.props.modalOpen({
            //     content: <Error text={ accountConstants.ACCOUNT_SIGN_IN_ERROR_TEXT } />,
            // });
        }
    }

    loginOnChange = (value) => {
        const login = value.trim();
        this.setState({
            login,
            submitDisabled: login.length === 0 || this.state.password.length === 0,
        });
    };

    passwordOnChange = (value) => {
        const password = value.trim();
        this.setState({
            password,
            submitDisabled: password.length === 0 || this.state.login.length === 0,
        });
    };

    submit = () => {
        if (this.props.account.sign_in_loading || this.state.submitDisabled) {
            return;
        }
        this.props.signIn(this.state.login, this.state.password);
    };

    render() {
        const {
            login,
            password,
            submitDisabled,
        } = this.state;
        const {
            scrollContainer,
            account,
        } = this.props;

        return (
            <View>
                <TextInput
                    value={ login }
                    placeholder={ accountConstants.ACCOUNT_SIGN_IN_USERNAME_TEXT }
                    first={ true }
                    autoCorrect={ false }
                    autoFocus={ true }
                    keyboardType='email-address'
                    onChange={ this.loginOnChange }
                    scrollContainer={ scrollContainer }
                />
                <TextInput
                    value={ password }
                    placeholder={ accountConstants.ACCOUNT_SIGN_IN_PASSWORD_TEXT }
                    last={ true }
                    lastAfterFirst={ true }
                    onChange={ this.passwordOnChange }
                    secureTextEntry={ true }
                    scrollContainer={ scrollContainer }
                />
                <ButtonBlue
                    style={ styles.submit_btn }
                    text={ accountConstants.ACCOUNT_SIGN_IN_SUBMIT_BUTTON_TEXT }
                    onPress={ this.submit }
                    loading={ account.sign_in_loading }
                    disabled={ submitDisabled }
                />
                <View style={ styles.links_wrapper }>
                    <Link
                        text={ accountConstants.ACCOUNT_SIGN_IN_FORGOT_PASSWORD_TEXT }
                        style={ styles.link }
                        onPress={ this.props.forgotPasswordClickHandler }
                    />
                    <Link
                        text={ accountConstants.ACCOUNT_SIGN_UP_SUBMIT_BUTTON_TEXT }
                        style={ styles.link }
                        onPress={ this.props.signUpClickHandler }
                    />
                </View>
            </View>
        );
    }
}

export default SignIn;
