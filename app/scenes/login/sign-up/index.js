// @flow

import { connect } from 'react-redux';
import {
    accountActions,
    modalActions,
} from '../../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = ({
    signUp: accountActions.signUp,
    modalOpen: modalActions.open,
    modalClose: modalActions.close,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
