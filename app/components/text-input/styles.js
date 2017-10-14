import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';
import { deviceUtils } from '../../utils';

export default stylesGenerator({
    container: {
        borderWidth: 1,
        borderColor: colors.text_field_border,
        borderRadius: 7,
        backgroundColor: colors.text_field_bg,
    },
    field: {
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 18,
        color: colors.black,
    },
    custom_placeholder: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
});
