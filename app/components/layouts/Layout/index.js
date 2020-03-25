import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';

import ModalComponent from '../../Modal';
import { OverlayBlock } from '../../blocks';

import { statusBarHeight, viewportWidth, viewportHeight } from '../../../constants';

const defaultStyles = {
  flex: 1,
  position: 'relative',
  width: viewportWidth,
  height: viewportHeight,
  marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
  marginBottom: 75,
};

const mapStateToProps = state => ({
  common: state.common,
});

class Layout extends Component {
  wrapChildren = children => {
    if (Array.isArray(children)) {
      return children.map((child, key) => {
        const childStyle = { ...child.props.style };
        return React.cloneElement(child, { key, style: childStyle });
      });
    } else {
      return React.cloneElement(children);
    }
  };

  // TODO : hasModal props ?

  render() {
    const {
      children,
      propStyles,
      common: { overlayIsShown, appInProgress, resultMessage },
    } = this.props;

    const wrappedChildren = this.wrapChildren(children);
    return (
      <View style={{ ...defaultStyles, ...propStyles }}>
        {wrappedChildren}
        <ModalComponent />
        {overlayIsShown && <OverlayBlock isLoading={appInProgress} message={resultMessage} />}
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(Layout);
