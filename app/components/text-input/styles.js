import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';
import { deviceUtils } from '../../utils';

export default stylesGenerator({
    container: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
    },
    field: {
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        textAlignVertical: 'center',
        textAlign: 'left',
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
