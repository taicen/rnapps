/* eslint-disable no-nested-ternary */
import React, { Fragment } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { fonts } from '../../../constants';

const options = {
  title: 'Загрузите фото',
  takePhotoButtonTitle: 'Снять на камеру',
  chooseFromLibraryButtonTitle: 'Выбрать из галереи',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const containerStyle = {
  backgroundColor: '#F4F4F4',
  borderStyle: 'dashed',
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center'
};

const titleStyle = {
  fontFamily: fonts.OpenSansBold,
  fontSize: 12,
  lineHeight: 22,
  color: '#54575A',
  marginTop: 5
};

const ImagePickerComponent = ({
  wide,
  icon,
  title,
  style,
  action,
  image,
  options: propOptions,
  pickStyle = 'showImagePicker',
  error
}) => {
  const finalContainerStyle = {
    ...containerStyle,
    ...style,
    width: wide ? '100%' : '48%',
    height: wide ? 125 : 90,
    borderWidth: wide ? 1 : 2,
    borderColor: error ? 'red' : wide ? 'transparent' : error ? 'red' : '#D3D3D3',
    marginBottom: 10
  };

  const source = pickStyle === 'showImagePicker' ? image.uri : `data:${image.type};base64,${image.data}`;
  
  return (
    <TouchableOpacity
      onPress={() => ImagePicker[pickStyle]({ ...options, ...propOptions }, action)}
      style={finalContainerStyle}
    >
      {image ? (
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: source }} />
      ) : (
        <Fragment>
          {icon}
          <Text style={{ ...titleStyle }}>{title}</Text>
        </Fragment>
      )}
    </TouchableOpacity>
  );
};

export default ImagePickerComponent;
