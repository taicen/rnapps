import React, { Component } from "react";
import { View, Text } from "react-native";

const multipleChildrenContainerStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap"
};

const titleStyle = {
  lineHeight: 18,
  color: "#54575A"
};

const subtitleStyle = {
  fontSize: 12,
  opacity: 0.6,
  color: "#54575A",
  marginBottom: 10,
  marginTop: 5
};

class ImagePickerLayout extends Component {
  wrapChildren = children => {
    if (Array.isArray(children)) {
      return (
        <View style={{ ...multipleChildrenContainerStyle }}>
          {children.map((child, key) => {
            const childStyle = { ...child.props.style };
            return React.cloneElement(child, { key, style: childStyle });
          })}
        </View>
      );
    } else {
      return <View>{React.cloneElement(children)}</View>;
    }
  };

  render() {
    const { children, title, subtitle, propStyles, ...otherProps } = this.props;
    const wrappedChildren = this.wrapChildren(children);
    return (
      <View style={{ marginTop: 20 }}>
        <Text style={{ ...titleStyle }}>{title}</Text>
        <Text style={{ ...subtitleStyle }}>{subtitle}</Text>
        {wrappedChildren}
      </View>
    );
  }
}

export default ImagePickerLayout;
