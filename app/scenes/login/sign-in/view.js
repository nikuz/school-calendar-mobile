// @flow

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import {
    KeyboardAwareScrollView,
    TextInput,
    ButtonGreen,
    ButtonBlue,
    Link,
    // NetworkError,
    // Error,
} from '../../../components';
import store from '../../../store';
import styles from '../styles';

type Props = {
    account: Object,
    lexemes: Object,
    signIn: (email: string, password: string) => void,
    // modalOpen: PropTypes.func.isRequired,
    goToSignUp: () => void,
    goToForgotPassword: () => void,
};

type State = {
    login: string,
    password: string,
};

class SignIn extends React.Component<Props, State> {
    state = {
        login: '',
        password: '',
    };

    static navigationOptions = () => {
        const lexemes = store.getState().settings.lexemes;
        return {
            title: lexemes['Account.Sign-In.Title'],
        };
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
        });
    };

    passwordOnChange = (value) => {
        const password = value.trim();
        this.setState({
            password,
        });
    };

    submit = () => {
        if (this.props.account.sign_in_loading) {
            return;
        }
        this.props.signIn(this.state.login, this.state.password);
    };

    render() {
        const {
            login,
            password,
        } = this.state;
        const {
            account,
            lexemes,
        } = this.props;

        return (
            <View style={ styles.container }>
                <KeyboardAwareScrollView ref={ el => this.scrollContainer = el }>
                    <View style={ styles.content }>
                        <TextInput
                            value={ login }
                            placeholder='Account.Sign-In.Username'
                            autoCorrect={ false }
                            keyboardType='email-address'
                            containerStyle={ styles.field }
                            onChange={ this.loginOnChange }
                            scrollContainer={ this.scrollContainer }
                        />
                        <TextInput
                            value={ password }
                            placeholder='Account.Sign-In.Password'
                            secureTextEntry={ true }
                            containerStyle={ styles.field }
                            onChange={ this.passwordOnChange }
                            scrollContainer={ this.scrollContainer }
                        />
                        <ButtonGreen
                            style={ styles.submit_btn }
                            text='Account.Sign-In.Submit-Button'
                            onPress={ this.submit }
                            loading={ account.sign_in_loading }
                        />
                        <Text style={ styles.create_account_question }>
                            { lexemes['Account.Sign-In.Create-Account-Question'] }
                        </Text>
                        <ButtonBlue
                            style={ styles.submit_btn }
                            text='Account.Sign-In.Create-Account-Button'
                            onPress={ this.props.goToSignUp }
                        />
                    </View>
                </KeyboardAwareScrollView>
                <View style={ styles.forgot_password }>
                    <Link
                        text='Account.Sign-In.Forgot-Password'
                        style={ styles.forgot_password_text }
                        onPress={ this.props.goToForgotPassword }
                    />
                </View>
            </View>
        );
    }
}

export default SignIn;
