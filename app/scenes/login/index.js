// @flow

import { connect } from 'react-redux';
import {
    resetLoginState,
    makeSignInActive,
    makeSignUpActive,
    makeForgotPasswordActive,
} from '../../actions/account';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = {
    resetLoginState,
    makeSignInActive,
    makeSignUpActive,
    makeForgotPasswordActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
