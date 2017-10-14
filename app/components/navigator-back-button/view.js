// @flow

import React from 'react';
import {
    TouchableOpacity,
    Text,
    Image,
} from 'react-native';
import * as navigatorConstants from '../../constants/navigator';
import styles from './styles';

import backIcon from '../../../assets/images/arrow-back.png';

type Props = {
    back: () => void,
};

class NavigatorBackButton extends React.Component<Props, void> {
    render = () => (
        <TouchableOpacity
            style={ styles.container }
            onPress={ this.props.back }
        >
            <Image source={ backIcon } style={ styles.icon } />
            <Text style={ styles.text }>
                { navigatorConstants.NAVIGATOR_BACK_TEXT }
            </Text>
        </TouchableOpacity>
    );
}
export default NavigatorBackButton;
