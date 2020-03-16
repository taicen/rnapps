import React, { Component } from "react";
import { View } from "react-native";

import { blocksContainerStyles } from "../../../styles";

class BottomBlock extends Component {
  render() {
    const { children, styles, ...otherProps } = this.props;
    return (
      <View style={[blocksContainerStyles("bottom"), styles]}>{children}</View>
    );
  }
}

export default BottomBlock;
