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
    signInClickHandler: () => void,
    // modalOpen: PropTypes.func.isRequired,
    signUp: (name: string, email: string, password: string) => void,
};

type State = {
    login: string,
    email: string,
    password: string,
    submitDisabled: boolean,
};

class SignUp extends React.Component<Props, State> {
    state = {
        login: '',
        email: '',
        password: '',
        submitDisabled: true,
    };

    componentWillReceiveProps(newProps) {
        if (newProps.account.sign_up_network_error && !this.props.account.sign_up_network_error) {
            // this.props.modalOpen({
            //     content: (
            //         <NetworkError retryCallback={ this.submit } />
            //     ),
            // });
        }
        if (newProps.account.sign_up_error && !this.props.account.sign_up_error) {
            // let message = accountConstants.ACCOUNT_SIGN_UP_ERROR_TEXT;
            // if (newProps.account.sign_up_error.type.indexOf('DuplicateException') !== -1) {
            //     message = accountConstants.ACCOUNT_SIGN_UP_USER_EXIST_ERROR_TEXT;
            // }
            // this.props.modalOpen({
            //     content: <Error text={ message } />,
            // });
        }
    }

    loginOnChange = (value) => {
        const login = value.trim();
        this.setState({
            login: value,
            submitDisabled: (
                login.length === 0 || this.state.password.length === 0 || this.state.email.length === 0
            ),
        });
    };

    emailOnChange = (value) => {
        const email = value.trim();
        this.setState({
            email,
            submitDisabled: (
                email.length === 0 || this.state.password.length === 0 || this.state.login.length === 0
            ),
        });
    };

    passwordOnChange = (value) => {
        const password = value.trim();
        this.setState({
            password: value,
            submitDisabled: (
                password.length === 0 || this.state.login.length === 0 || this.state.email.length === 0
            ),
        });
    };

    submit = () => {
        if (this.props.account.sign_up_loading) {
            return;
        }
        this.props.signUp(
            this.state.login,
            this.state.email,
            this.state.password,
        );
    };

    render() {
        const {
            login,
            email,
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
                    placeholder={ accountConstants.ACCOUNT_SIGN_UP_USERNAME_TEXT }
                    first={ true }
                    autoCorrect={ false }
                    keyboardType='email-address'
                    autoFocus={ true }
                    onChange={ this.loginOnChange }
                    scrollContainer={ scrollContainer }
                />
                <TextInput
                    value={ email }
                    placeholder={ accountConstants.ACCOUNT_SIGN_UP_EMAIL_TEXT }
                    middle={ true }
                    lastAfterFirst={ true }
                    autoCorrect={ false }
                    onChange={ this.emailOnChange }
                    scrollContainer={ scrollContainer }
                />
                <TextInput
                    value={ password }
                    placeholder={ accountConstants.ACCOUNT_SIGN_UP_PASSWORD_TEXT }
                    last={ true }
                    lastAfterFirst={ true }
                    onChange={ this.passwordOnChange }
                    secureTextEntry={ true }
                    scrollContainer={ scrollContainer }
                />
                <ButtonBlue
                    style={ styles.submit_btn }
                    text={ accountConstants.ACCOUNT_SIGN_UP_SUBMIT_BUTTON_TEXT }
                    onPress={ this.submit }
                    loading={ account.sign_up_loading }
                    disabled={ submitDisabled }
                />
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

export default SignUp;
