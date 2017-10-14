// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    text: {
        marginTop: 5,
        marginRight: 15,
        marginBottom: 35,
        color: colors.black,
        fontSize: 18,
        fontWeight: '500',
    },
    buttons: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});
