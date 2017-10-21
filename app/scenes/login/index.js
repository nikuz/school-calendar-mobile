// @flow

import { connect } from 'react-redux';
import {
    accountActions,
} from '../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = {
    resetLoginState: accountActions.resetLoginState,
    makeSignInActive: accountActions.makeSignInActive,
    makeSignUpActive: accountActions.makeSignUpActive,
    makeForgotPasswordActive: accountActions.makeForgotPasswordActive,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
