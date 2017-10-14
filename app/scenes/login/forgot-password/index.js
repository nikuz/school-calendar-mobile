// @flow

import { connect } from 'react-redux';
import * as accountActions from '../../../actions/account';
import * as navigatorActions from '../../../actions/navigator';
import * as modalActions from '../../../actions/modal';
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
