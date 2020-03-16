/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';

import { Check } from '../../svg';

const containerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  height: 40
};

const checkboxStyle = {
  width: 23,
  height: 23,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#d3d3d3'
};

const checkboxArrowStyle = {
  position: 'absolute',
  bottom: 0
};

const linkStyle = {
  color: '#00a5b4',
}

const labelStyle = {
  color: '#54575A',
  marginLeft: 10
};

const errorStyle = {
  borderColor: 'red',
  color: 'red'
};

class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false
    };
  }

  getValue = (state = this.state) => {
    return state.value;
  };

  setOnState = (value = !this.getValue()) => {
    const cb = () => {
      this.props.onChange(value);
    };

    this.setState({ value }, cb);
  };

  render() {
    const { label, style, mainColor, error, linkLabel, linkUrl } = this.props;
    const { value } = this.state;
    return (
      <TouchableOpacity style={[containerStyle, style]} onPress={() => this.setOnState()}>
        <View style={[checkboxStyle, error && errorStyle]}>
          {value && (
            <View style={checkboxArrowStyle}>
              <Check color={mainColor} />
            </View>
          )}
        </View>
        <Text style={[labelStyle, error && { color: errorStyle.color }]}>
          {label}
          {(linkLabel && linkUrl) && 
            <Text 
              style={linkStyle}
              onPress={() => Linking.openURL(linkUrl)}
            >
              {linkLabel}
            </Text>
          }
        </Text>
        
      </TouchableOpacity>
    );
  }
}

export default connect(
  ({ themeChanger }) => ({
    mainColor: themeChanger.main_color
  }),
  null
)(Checkbox);
