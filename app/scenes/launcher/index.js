// @flow

import { connect } from 'react-redux';
import { navigatorActions } from '../../actions';
import View from './view';

const mapStateToProps = (state: Object) => ({
    account: state.account,
});

const mapDispatchToProps = {
    navigateTo: navigatorActions.replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
