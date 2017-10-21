// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 50,
    },

    page_title: {
        marginBottom: 50,
        fontSize: 30,
        textAlign: 'center',
        color: colors.black,
    },

    field: {
        marginBottom: 20,
    },

    submit_btn: {
        marginBottom: 20,
    },

    create_account_question: {
        textAlign: 'center',
        marginBottom: 10,
        color: colors.black,
        fontSize: 14,
    },

    forgot_password: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 20,
        alignItems: 'center',
    },
    forgot_password_text: {
        fontSize: 18,
        textAlign: 'center',
    },
});

