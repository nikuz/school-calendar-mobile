// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';
import { deviceUtils } from '../../utils';

export default stylesGenerator({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    item: {
        flex: 1,
        paddingVertical: 7,
        backgroundColor: colors.bg,
        borderWidth: 1,
        borderColor: colors.blue,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    item_first: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderLeftWidth: 1,
        marginRight: deviceUtils.isAndroid() ? -1 : 0,
    },
    item_last: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderRightWidth: 1,
        marginLeft: deviceUtils.isAndroid() ? -1 : 0,
    },
    item_selected: {
        backgroundColor: colors.blue,
    },
    text: {
        fontSize: 16,
        color: colors.blue,
        textAlign: 'center',
    },
    text_selected: {
        color: colors.white,
    },
});
