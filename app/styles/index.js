import { viewportWidth, viewportHeight, fonts } from '../constants';
import theme from './theme.style';

export const blocksContainerStyles = blockName => {
  const commonStyles = {
    position: 'absolute',
    // eslint-disable-next-line no-nested-ternary
    width: blockName === 'map' ? viewportWidth : blockName === 'top' ? 'auto' : null,
    height: blockName === 'map' ? viewportHeight : 'auto',
    marginHorizontal: blockName === 'map' ? 0 : 10
  };
  if (blockName === 'top') {
    return {
      top: 12,
      left: 0,
      paddingRight: 20,
      ...commonStyles
    };
  }
  if (blockName === 'bottom') {
    return {
      bottom: 12,
      left: 0,
      right: 0,
      ...commonStyles
    };
  }
  return {
    ...commonStyles
  };
};

export const shadowBoxStyles = {
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowColor: '#000',
  shadowOffset: { height: 0, width: 0 }
};

export const shadowBoxStylesLight = {
  shadowOpacity: 0.1,
  shadowRadius: 12,
  shadowColor: '#000',
  shadowOffset: { height: 0, width: 0 },
  elevation: 3
};

export const baseStyles = {
  h1: {
    fontSize: 32,
    color: '#54575A',
    lineHeight: 36,
    marginVertical: 20,
    fontFamily: fonts.RobotoSlabBold,
    textAlign: 'center'
  }
};

export const headerNavTitleStyle = {
  fontFamily: fonts.OpenSansSemiBold,
  fontSize: 16,
  textTransform: 'uppercase',
  color: '#54575A',
  letterSpacing: 1
};

export const successMessage = {
  fontFamily: fonts.OpenSansRegular,
  fontSize: 12,
  color: theme.PRIMARY_COLOR,
  marginTop: 5
};

export const whiteWrapper = {
  paddingVertical: 25,
  paddingHorizontal: 20,
  backgroundColor: '#ffffff',
  borderRadius: 15
};
