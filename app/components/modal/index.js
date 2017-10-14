// @flow

import { connect } from 'react-redux';
import { close as modalClose } from '../../actions/modal';
import View from './view';

const mapStateToProps = (state: Object) => ({
    ...state.modal,
});

const mapDispatchToProps = {
    close: modalClose,
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
