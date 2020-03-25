import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const { height: viewportHeight, width: viewportWidth } = Dimensions.get('window');

export const statusBarHeight = getStatusBarHeight();

export const fonts = {
  OpenSansBold: 'OpenSans-Bold',
  OpenSansBoldItalic: 'OpenSans-BoldItalic',
  OpenSansExtraBold: 'OpenSans-ExtraBold',
  OpenSansExtraBoldItalic: 'OpenSans-ExtraBoldItalic',
  OpenSansItalic: 'OpenSans-Italic',
  OpenSansLight: 'OpenSans-Light',
  OpenSansLightItalic: 'OpenSans-LightItalic',
  OpenSansSemiBold: 'OpenSans-SemiBold',
  OpenSansSemiBoldItalic: 'OpenSans-SemiBoldItalic',
  OpenSansRegular: 'OpenSans-Regular',
  RobotoSlabRegular: 'RobotoSlab-Regular',
  RobotoSlabLight: 'RobotoSlab-Light',
  RobotoSlabThin: 'RobotoSlab-Thin',
  RobotoSlabBold: 'RobotoSlab-Bold',
};
