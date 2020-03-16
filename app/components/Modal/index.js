import React, { Component, Fragment } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, findNodeHandle, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import { BlurView } from '@react-native-community/blur';

import { default as modalTypes } from './types';
import { RootModalHeader } from './partials';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { fonts, viewportWidth, viewportHeight } from '../../constants';

const MODAL_TYPES = {
  menu: modalTypes.ModalMenu,
  help: modalTypes.SupportMenu
};

const mapStateToProps = state => ({
  ...state.modal
});

class ModalComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalVisible: false,
      viewRef: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props && nextProps.modalProps) {
      this.setState({
        isModalVisible: nextProps.modalProps.open
      });
    }
  }

  componentDidMount() {
    this.setState({ viewRef: findNodeHandle(this.blurRef) });
  }

  render() {
    const { modalType, modalProps } = this.props;
    const { isModalVisible, viewRef } = this.state;

    if (!modalType) {
      return null;
    }

    const ModalType = MODAL_TYPES[modalType];

    return (
      <View
        style={{ zIndex: 1, backgroundColor: 'orange' }}
        ref={() => {
          blurView => {
            this.blurRef = blurView;
          };
        }}
      >
        <Modal
          isVisible={isModalVisible}
          style={[styles.modalContainer, { zIndex: 0 }]}
          backdropOpacity={0}
          onBackdropPress={modalProps.closeModal}
          onBackButtonPress={modalProps.closeModal}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <Fragment>
            <TouchableOpacity style={styles.absolute} onPress={modalProps.closeModal}>
              {Platform.OS === 'ios' ? (
                <BlurView
                  blurType="light"
                  blurAmount={8}
                  viewRef={viewRef}
                  style={[styles.absolute, { left: 0 }]}
                />
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    top: -25,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    backgroundColor: '#fff'
                  }}
                />
              )}
            </TouchableOpacity>
            <RootModalHeader styles={styles} {...modalProps} />

            <ModalType {...modalProps} />
          </Fragment>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 0,
    justifyContent: 'flex-start',
    paddingTop: 15
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13
  },
  modalTitle: {
    fontFamily: fonts.OpenSansSemiBold,
    color: '#54575A',
    fontSize: 16,
    marginLeft: 12
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: -20,
    bottom: 0,
    right: 0,
    width: viewportWidth,
    height: viewportHeight
  }
});

export default connect(
  mapStateToProps,
  null
)(ModalComponent);
