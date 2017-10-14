import { StyleSheet } from 'react-native';
import { deviceUtils } from '../utils';

const adjustableProperties = [
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginVertical',
    'marginHorizontal',
    'paddingTop',
    'paddingBottom',
    'paddingRight',
    'paddingLeft',
    'paddingVertical',
    'paddingHorizontal',
    'top',
    'bottom',
    'left',
    'right',
    'width',
    'height',
    'borderRadius',
    'shadowRadius',
    'elevation',
];

export default function(styles) {
    if (deviceUtils.isTablet()) {
        Object.keys(styles).forEach(styleItem => {
            const selector = styles[styleItem];
            Object.keys(selector).forEach(propKey => {
                const prop = selector[propKey];
                if (adjustableProperties.includes(propKey)) {
                    selector[propKey] = prop * 1.1;
                } else if (key === 'fontSize') {
                    selector[propKey] = prop * 1.15;
                }
            });
        });
    }

    return StyleSheet.create(styles);
}
