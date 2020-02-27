import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Cursor from '../components/Cursor';
import Animated from 'react-native-reanimated';
const {Value, add} = Animated;

const { width: totalWidth } = Dimensions.get('window');

const count = 5;
const width = totalWidth / count;
const height = width;

const SliderCom = () => {
  const x = new Value(0);
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          backgroundColor: '#000',
          borderRadius: height / 2,
          width: add(x, height),
          height
        }}
      />
      <Cursor size={height} {...{x, count}}/>       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: totalWidth,
    height,
    borderRadius: height / 2,
    backgroundColor: '#fff'
  }
})

export default SliderCom;