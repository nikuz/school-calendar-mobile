// @flow

import React from 'react';
import {
    View,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import * as configConstants from '../../constants/config';
import {
    KeyboardAwareScrollView,
    Button,
    ButtonBlue,
    NavigatorHeader,
} from '../../components';
import SignIn from './sign-in';
import SignUp from './sign-up';
import ForgotPassword from './forgot-password';
import * as accountConstants from '../../constants/account';
import { deviceUtils } from '../../utils';
import styles from './styles';

type Props = {
    account: Object,
    resetLoginState: () => void,
    makeSignInActive: () => void,
    makeSignUpActive: () => void,
    makeForgotPasswordActive: () => void,
};

class Login extends React.Component<Props, void> {
    static navigationOptions = () => {
        let options = {
            title: configConstants.APP_NAME,
        };
        if (deviceUtils.isAndroid()) {
            options = {
                header: NavigatorHeader(options),
            };
        }
        return options;
    };

    constructor(props) {
        super(props);

        this.resetState = this.resetState.bind(this);
        this.selectSignUpForm = this.selectSignUpForm.bind(this);
        this.selectSignInForm = this.selectSignInForm.bind(this);
        this.selectForgotPassword = this.selectForgotPassword.bind(this);
    }

    resetState() {
        this.props.resetLoginState();
    }

    selectSignUpForm() {
        this.props.makeSignUpActive();
    }

    selectSignInForm() {
        this.props.makeSignInActive();
    }

    selectForgotPassword() {
        this.props.makeForgotPasswordActive();
    }

    render() {
        const {
            account,
        } = this.props;

        return (
            <KeyboardAwareScrollView ref={ el => this.scrollContainer = el }>
                <View style={ styles.container }>
                    { !account.sign_in_is_active
                    && !account.sign_up_is_active
                    && !account.forgot_password_is_active
                    && (
                        <View>
                            <Button
                                text={ accountConstants.ACCOUNT_SIGN_UP_SUBMIT_BUTTON_TEXT }
                                onPress={ this.selectSignUpForm }
                            />
                            <ButtonBlue
                                text={ accountConstants.ACCOUNT_SIGN_IN_SUBMIT_BUTTON_TEXT }
                                onPress={ this.selectSignInForm }
                            />
                        </View>
                    ) }

                    { account.sign_in_is_active && (
                        <SignIn
                            scrollContainer={ this.scrollContainer }
                            forgotPasswordClickHandler={ this.selectForgotPassword }
                            signUpClickHandler={ this.selectSignUpForm }
                        />
                    ) }
                    { account.sign_up_is_active && (
                        <SignUp
                            scrollContainer={ this.scrollContainer }
                            signUpClickHandler={ this.selectSignInForm }
                        />
                    ) }
                    { account.forgot_password_is_active && (
                        <ForgotPassword
                            scrollContainer={ this.scrollContainer }
                            signInClickHandler={ this.selectSignInForm }
                        />
                    ) }
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default Login;
