/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { TextInput, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import TextInputMask from 'react-native-text-input-mask';

import { ArrowRight } from '../../svg';
import ButtonInline from '../ButtonInline';

const containerStyle = {
  marginTop: 15,
  width: '100%'
};

const labelStyle = {
  lineHeight: 26,
  color: '#54575A'
};

const inputContainerStyle = {
  height: 40,
  borderColor: '#D3D3D3',
  borderWidth: 1,
  borderRadius: 5,
  paddingLeft: 12
};

const errorContainerStyle = {
  width: '100%'
};

const errorTextStyle = {
  fontSize: 12,
  lineHeight: 26,
  color: '#EB7575'
};

const phoneContainerStyle = {
  width: '100%',
  height: 40
};

const phoneButtonStyle = {
  width: 37,
  height: 40,
  position: 'absolute',
  top: 0,
  right: 0,
  justifyContent: 'center',
  alignItems: 'center'
};

const hintStyle = {
  fontSize: 12,
  color: '#54575A',
  marginBottom: 10,
  opacity: 0.6
};

function RenderArrowButton({ disable, loading, mainColor, hasArrowButton }) {
  if (disable || !hasArrowButton) return null;
  if (loading) return <ActivityIndicator />;

  return <ArrowRight color={mainColor} />;
}

class FormInput extends Component {
  renderPhoneInput = () => {
    const {
      input,
      onPress,
      hasArrowButton,
      disable,
      mainColor,
      loading,
      mask,
      unControlled,
      placeholder
    } = this.props;

    const _placeholder = '+7 (000) 000 00 000';

    return (
      <View style={phoneContainerStyle}>
        <TextInputMask
          mask={mask}
          onBlur={input.onBlur}
          onChangeText={input.onChange}
          placeholder={placeholder || _placeholder}
          maskDefaultValue
          keyboardType="numeric"
          type="cel-phone"
          style={inputContainerStyle}
          editable={!disable}
          value={!unControlled ? input.value : undefined}
        />
        <TouchableOpacity style={phoneButtonStyle} onPress={onPress}>
          <RenderArrowButton
            mainColor={mainColor}
            hasArrowButton={hasArrowButton}
            disable={disable}
            loading={loading}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderPasswordInput = () => {
    const { input } = this.props;
    return <TextInput onChangeText={input.onChange} style={inputContainerStyle} secureTextEntry />;
  };

  render() {
    const {
      input,
      meta: { touched, error },
      errors,
      label,
      phoneInput,
      passwordInput,
      placeholder,
      defaultValue,
      unControlled,
      disable,
      containerPropsStyle,
      width,
      hint,
      hasInlineButton,
      inlineBtnOnPress,
      mainColor,
      mask
    } = this.props;
    const finalInputContainerStyle = {
      ...inputContainerStyle,
      width: width || '100%'
    };

    return (
      <View style={[containerStyle, containerPropsStyle]}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text style={labelStyle}>{label}</Text>
            {hasInlineButton && (
              <ButtonInline
                title="Забыли пароль?"
                onPress={inlineBtnOnPress}
                style={{ fontSize: 14 }}
                color={mainColor}
              />
            )}
          </View>

          {hint && <Text style={hintStyle}>{hint}</Text>}

          {phoneInput ? (
            this.renderPhoneInput()
          ) : passwordInput ? (
            this.renderPasswordInput()
          ) : (
            <TextInputMask
              mask={mask}
              type="text"
              onBlur={() => {
                input.onBlur && input.onBlur();
              }}
              onChangeText={(formatted, extracted) =>
                input.onChange && input.onChange(extracted || formatted)
              }
              style={finalInputContainerStyle}
              editable={!disable}
              placeholder={placeholder}
              value={input.value}
              defaultValue={defaultValue}
            />
          )}
        </View>
        <View style={errorContainerStyle}>
          {error && touched && <Text style={errorTextStyle}>{error}</Text>}
          {errors ? <Text style={errorTextStyle}>{errors}</Text> : null}
        </View>
      </View>
    );
  }
}

export default connect(
  ({ themeChanger }) => ({
    mainColor: themeChanger.main_color
  }),
  null
)(FormInput);
