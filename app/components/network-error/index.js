// @flow

import { connect } from 'react-redux';
import { close as modalClose } from '../../actions/modal';
import View from './view';

const mapDispatchToProps = {
    close: modalClose,
};

export default connect(null, mapDispatchToProps)(View);
