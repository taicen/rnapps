import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BubblesLoader } from 'react-native-indicator';

//import { blocksContainerStyles } from '../../../styles'

class OverlayBlock extends Component {
  render() {
    const { children, message, isLoading, ...otherProps } = this.props;
    return (
      <View style={styles.overlay}>
        {isLoading && <BubblesLoader color="white" />}
        {message && <Text style={styles.resultMessage}>{message}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10000,
  },
  resultMessage: {
    width: '60%',
    height: 'auto',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    overflow: 'hidden',
  },
});

export default OverlayBlock;
