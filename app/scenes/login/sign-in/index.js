// @flow

import { connect } from 'react-redux';
import * as accountActions from '../../../actions/account';
import * as modalActions from '../../../actions/modal';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = {
    signIn: accountActions.signIn,
    modalOpen: modalActions.open,
    modalClose: modalActions.close,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
