// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.btn_border_color,
        borderRadius: 7,
        backgroundColor: colors.bg,
    },
    blue_btn: {
        backgroundColor: colors.blue,
        borderColor: colors.blue,
    },
    btn_disabled: {
        backgroundColor: colors.light_grey,
        borderColor: colors.light_grey,
    },
    text: {
        fontSize: 18,
        color: colors.blue,
        textAlign: 'center',
    },
    blue_text: {
        color: colors.white,
    },
    disabled_text: {
        color: 'rgba(0, 0, 0, .2)',
    },
    hidden_text: {
        opacity: 0,
    },
    loader: {
        position: 'absolute',
        top: -6,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});
