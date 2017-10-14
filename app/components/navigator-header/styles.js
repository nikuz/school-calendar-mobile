// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingTop: 35,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
    },
    title: {
        flex: 1,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    title_text: {
        fontSize: 17,
        color: colors.black,
    },
});
