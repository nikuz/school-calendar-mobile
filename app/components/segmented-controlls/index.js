// @flow

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import styles from './styles';

type Item = {
    id: string,
    value: string,
    selected?: boolean,
};

type Props = {
    items: Item[],
    onChange: (id: string) => void,
};

class SegmentedControls extends React.Component<Props, void> {
    render() {
        const {
            items,
            onChange,
        } = this.props;

        return (
            <View style={ styles.container }>
                { items.map((item, key) => {
                    return (
                        <TouchableOpacity
                            style={ [
                                styles.item,
                                key === 0 && styles.item_first,
                                key === items.length - 1 && styles.item_last,
                                item.selected && styles.item_selected,
                            ] }
                            activeOpacity={ 0.6 }
                            key={ item.id }
                            onPress={ onChange.bind(null, item.id) }
                        >
                            <Text style={ [styles.text, item.selected && styles.text_selected] }>
                                { item.value }
                            </Text>
                        </TouchableOpacity>
                    );
                }) }
            </View>
        );
    }
}

export default SegmentedControls;
