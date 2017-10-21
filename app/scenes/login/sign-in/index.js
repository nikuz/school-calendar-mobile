// @flow

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { DispatchAPI } from 'redux';
import {
    accountActions,
    navigatorActions,
    modalActions,
} from '../../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
    lexemes: state.settings.lexemes,
});

const mapDispatchToProps = (dispatch: DispatchAPI<*>) => ({
    signIn: bindActionCreators(accountActions.signIn, dispatch),
    goToSignUp: () => dispatch(navigatorActions.push({
        id: 'signup',
    })),
    goToForgotPassword: () => dispatch(navigatorActions.push({
        id: 'signup',
    })),
    modalOpen: bindActionCreators(modalActions.open, dispatch),
    modalClose: bindActionCreators(modalActions.close, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
