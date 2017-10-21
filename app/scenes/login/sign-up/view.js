// @flow

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { FormattedMessage } from 'react-intl';
import {
    KeyboardAwareScrollView,
    ButtonBlue,
    ButtonGreen,
    TextInput,
    // NetworkError,
    // Error,
} from '../../../components';
import styles from '../styles';

type Props = {
    account: Object,
    // modalOpen: PropTypes.func.isRequired,
    signUp: (name: string, phone: string) => void,
    goBack: () => void,
};

type State = {
    name: string,
    phone: string,
    submitDisabled: boolean,
};

class SignUp extends React.Component<Props, State> {
    state = {
        name: '',
        phone: '',
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

    nameOnChange = (value) => {
        this.setState({
            name: value.trim(),
        });
    };

    phoneOnChange = (value) => {
        this.setState({
            phone: value.trim(),
        });
    };

    submit = () => {
        if (this.props.account.sign_up_loading) {
            return;
        }
        this.props.signUp(
            this.state.name,
            this.state.phone
        );
    };

    render() {
        const {
            name,
            phone,
        } = this.state;
        const {
            account,
            intl,
        } = this.props;
        const formatMessage = intl.formatMessage;

        return (
            <KeyboardAwareScrollView ref={ el => this.scrollContainer = el }>
                <View style={ styles.content }>
                    <Text style={ styles.page_title }>
                        { formatMessage({
                            id: 'Account.Sign-Up.Title',
                        }).toUpperCase() }
                    </Text>
                    <TextInput
                        value={ name }
                        placeholder='Account.Sign-Up.Name'
                        autoCorrect={ false }
                        keyboardType='email-address'
                        containerStyle={ styles.field }
                        onChange={ this.nameOnChange }
                        scrollContainer={ this.scrollContainer }
                    />
                    <TextInput
                        value={ phone }
                        placeholder='Account.Sign-Up.Phone'
                        autoCorrect={ false }
                        containerStyle={ styles.field }
                        onChange={ this.phoneOnChange }
                        scrollContainer={ this.scrollContainer }
                    />
                    <ButtonBlue
                        style={ styles.submit_btn }
                        text='Account.Sign-Up.Submit-Button'
                        onPress={ this.submit }
                        loading={ account.sign_up_loading }
                    />
                    <Text style={ styles.create_account_question }>
                        <FormattedMessage id='Account.Sign-Up.Already-Have-Account-Question' />
                    </Text>
                    <ButtonGreen
                        style={ styles.submit_btn }
                        text='Account.Sign-Up.Log-In-Button'
                        onPress={ this.props.goBack }
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

export default SignUp;
