// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';
import { deviceUtils } from '../../utils';

export default stylesGenerator({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: deviceUtils.isAndroid() ? 1 : 2,
    },
    icon: {
        width: 18,
        height: 22,
        marginRight: 5,
        top: deviceUtils.isAndroid() ? 2 : 0,
    },
    text: {
        fontSize: 17,
        color: colors.blue,
    },
});
