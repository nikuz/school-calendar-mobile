// @flow

import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 7,
        backgroundColor: colors.bg,
    },
    blue_btn: {
        backgroundColor: colors.blue,
    },
    green_btn: {
        backgroundColor: colors.green_light,
    },
    btn_disabled: {
        backgroundColor: colors.gray_light,
    },
    text: {
        fontSize: 18,
        color: colors.blue,
        textAlign: 'center',
    },
    blue_text: {
        color: colors.white,
    },
    green_text: {
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
