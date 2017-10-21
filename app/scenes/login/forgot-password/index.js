// @flow

import { connect } from 'react-redux';
import {
    accountActions,
    navigatorActions,
    modalActions,
} from '../../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = {
    restorePassword: accountActions.restorePassword,
    navigateTo: navigatorActions.replace,
    modalOpen: modalActions.open,
    modalClose: modalActions.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
