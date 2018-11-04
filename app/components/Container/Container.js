import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from './styles';

const Container = ({ children, backgroundColor }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <View style={[styles.container, { backgroundColor }]}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
};

export default Container;