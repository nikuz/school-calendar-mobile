// @flow

import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    injectIntl
)(View);
