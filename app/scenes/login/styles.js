// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingVertical: 30,
    },
    logo: {
        width: 72,
        height: 72,
        marginBottom: 25,
        alignSelf: 'center',
    },

    forgot_password_title: {
        marginTop: 45,
        marginBottom: 30,
        color: colors.black,
        fontSize: 24,
        textAlign: 'center',
    },
    forgot_password_text: {
        color: colors.black,
        fontSize: 18,
        textAlign: 'center',
    },
});

