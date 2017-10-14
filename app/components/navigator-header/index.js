// @flow

import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import styles from './styles';

type Props = {
    title: string,
    headerLeft?: ReactComponent,
    headerRight?: ReactComponent,
};

class NavigatorHeader extends React.Component<Props, void> {
    render = () => (
        <View style={ styles.container }>
            { this.props.headerLeft }
            <View style={ styles.title }>
                <Text style={ styles.title_text } ellipsizeMode='tail' numberOfLines={ 1 }>
                    { this.props.title }
                </Text>
            </View>
            { this.props.headerRight }
        </View>
    );
}

export default NavigatorHeader;
