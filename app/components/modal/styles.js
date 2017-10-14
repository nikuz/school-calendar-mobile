import stylesGenerator from '../../styles/generator';
import colors from '../../styles/colors';

export default stylesGenerator({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: '100%',
    },
    itemWrap: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: '100%',
    },
    touch_area: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        marginHorizontal: 9,
        backgroundColor: '#FFF',
        shadowColor: colors.black,
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
    },
    close: {
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 15,
        zIndex: 10,
    },
    close_icon: {
        width: 15,
        height: 15,
    },
});
