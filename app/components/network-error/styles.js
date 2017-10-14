// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 12,
    },
    content: {
        paddingRight: 15,
    },
    title: {
        marginTop: 5,
        marginBottom: 35,
        color: colors.black,
        fontSize: 18,
        fontWeight: '500',
    },
    question_text: {
        marginBottom: 40,
        color: colors.black,
        fontSize: 14,
    },

    buttons: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        marginHorizontal: 5,
    },
});
