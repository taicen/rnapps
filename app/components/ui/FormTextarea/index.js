import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { ArrowRight } from '../../svg';

const containerStyle = {
  marginTop: 15,
  width: '100%'
};

const labelStyle = {
  lineHeight: 26,
  color: '#54575A'
};

const inputContainerStyle = {
  height: 155,
  borderColor: '#D3D3D3',
  borderWidth: 1,
  borderRadius: 10,
  backgroundColor: '#fff',
  padding: 15,
  paddingTop: 15
};

const errorContainerStyle = {
  width: '100%'
  // marginTop: 7
};

const errorTextStyle = {
  fontSize: 12,
  lineHeight: 26,
  color: '#EB7575'
};

const supportContainerStyle = {
  width: '100%',
  height: 155
  // color: '#54575A'
  // flexDirection: 'row'
};

const supportArrowStyle = {
  backgroundColor: '#fff',
  width: 11,
  height: 11,
  borderLeftWidth: 1,
  borderLeftColor: '#C4C4C4',
  borderTopWidth: 1,
  borderTopColor: '#C4C4C4',
  position: 'absolute',
  top: 0,
  left: 15
};

const supportInputStyle = {
  paddingRight: 55,
  textAlignVertical: 'top'
};

const phoneButtonStyle = {
  width: 37,
  height: 40,
  position: 'absolute',
  bottom: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

const indicatorStyle = {
  position: 'absolute',
  bottom: 10,
  right: 10
};

const hintStyle = {
  fontSize: 12,
  color: '#54575A',
  marginBottom: 10
};

class FormTextarea extends Component {
  renderSupportTextarea = () => {
    const { input, onPress, placeholder, inProgress } = this.props;
    return (
      <View style={{ ...supportContainerStyle }}>
        <View style={{ ...supportArrowStyle }}></View>
        <TextInput
          // {...input}
          multiline={true}
          numberOfLines={4}
          placeholder={placeholder}
          value={input.value}
          onChangeText={input.onChange}
          style={{ ...inputContainerStyle, ...supportInputStyle }}
        />
        {inProgress ? (
          <ActivityIndicator style={{ ...indicatorStyle }} size="small" color="#67A960" />
        ) : (
          <TouchableOpacity style={{ ...phoneButtonStyle }} onPress={onPress}>
            <ArrowRight color="#BBBFC1" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  render() {
    const {
      // input: {
      //   onBlur,
      //   onFocus,
      //   value,
      //   name
      // },
      input,
      meta: { touched, error },
      label,
      supportTextarea,
      containerPropsStyle,
      width,
      hint
    } = this.props;
    const finalInputContainerStyle = {
      ...inputContainerStyle,
      width: width || '100%'
    };
    return (
      <View style={{ ...containerStyle, ...containerPropsStyle }}>
        <View>
          {label && <Text style={{ ...labelStyle }}>{label}</Text>}
          {hint && <Text style={{ ...hintStyle }}>{hint}</Text>}
          {supportTextarea ? (
            this.renderSupportTextarea()
          ) : (
            <TextInput {...input} style={{ ...finalInputContainerStyle }} />
          )}
        </View>
        <View style={{ ...errorContainerStyle }}>
          {touched && error && <Text style={{ ...errorTextStyle }}>{error}</Text>}
        </View>
      </View>
    );
  }
}

export default FormTextarea;
