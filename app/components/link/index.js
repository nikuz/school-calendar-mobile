// @flow

import React from 'react';
import { Text } from 'react-native';
import { Lexeme } from '../../components';
import styles from './styles';

type Props = {
    text: string,
    onPress: () => void,
    style: number | number[],
};

class Link extends React.Component<Props, void> {
    render() {
        const { style } = this.props;
        let linkStyle = [
            styles.link,
        ];
        if (style) {
            if (style instanceof Array) {
                linkStyle = linkStyle.concat(style);
            } else {
                linkStyle.push(style);
            }
        }

        return (
            <Text style={ linkStyle } onPress={ this.props.onPress }>
                <Lexeme id={ this.props.text } />
            </Text>
        );
    }
}

export default Link;

