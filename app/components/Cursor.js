import React from 'react'
import Animated from 'react-native-reanimated'
import { Interactable, ReText } from 'react-native-redash'

const { Value, concat, divide, round, add } = Animated;

export default class Cursor extends React.PureComponent {
  render() {
    const {x,count,size} = this.props;
    const snapPoints = new Array(count).fill(0).map((e,i)=>({x: i * size}))
    const index = add(round(divide(x, size)), 1)
    console.log(x);
    return (
        <Interactable {...{snapPoints}} animatedValueX={x} dragEnabled horizontalOnly>
        <Animated.View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: '#fff',            
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 24
          }}
        >
          <ReText text={concat(index)} />
        </Animated.View>
      </Interactable>
    )
  }
}