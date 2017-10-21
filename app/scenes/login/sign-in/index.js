// @flow

import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { DispatchAPI } from 'redux';
import { injectIntl } from 'react-intl';
import {
    accountActions,
    navigatorActions,
    modalActions,
} from '../../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    injectIntl
)(View);
