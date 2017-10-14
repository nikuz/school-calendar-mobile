// @flow

import { connect } from 'react-redux';
import { pop as back } from '../../actions/navigator';
import View from './view';

const mapDispatchToProps = {
    back,
};

export default connect(null, mapDispatchToProps)(View);
