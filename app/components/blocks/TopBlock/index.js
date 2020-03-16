import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { MSContextConsumer } from '../../../context/MainScreenContext';
import { viewportHeight } from '../../../constants';

class TopBlock extends Component {
  render() {
    const { children, autoHeight, autoWidth, ...otherProps } = this.props;
    return (
      <MSContextConsumer>
        {({ showListState, showResults }) =>
          !showListState ? (
            <View
              style={[
                styles.containerStyle,
                {
                  height: autoHeight,
                  width: autoWidth,
                  maxHeight:
                    showResults == false ? 44 : viewportHeight - (viewportHeight / 100) * 20
                }
              ]}
            >
              {children}
            </View>
          ) : null
        }
      </MSContextConsumer>
    );
  }
}

// --- STYLES --- //
const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    top: 12,
    paddingHorizontal: 10,
    width: '100%',
    // height: '100%',
    zIndex: Platform.OS === 'ios' ? 20 : 0,
    elevation: 3
    // overflow: "hidden"
  }
});

export default TopBlock;
