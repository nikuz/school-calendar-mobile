// @flow

import React from 'react';
import {
    Text,
} from 'react-native';
import { connect } from 'react-redux';

const Lexeme = ({ lexemes, id }) => (
    <Text>{ lexemes[id] }</Text>
);

export default connect((state: Object) => ({
    lexemes: state.settings.lexemes,
}), null)(Lexeme);
