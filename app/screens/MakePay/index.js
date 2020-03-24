import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Modal, Text, StyleSheet, StatusBar } from 'react-native';
// import * as cp from 'https://widget.cloudpayments.ru/bundles/cloudpayments';

//*REDUX*//
import { connect } from 'react-redux';

//*DEV*/
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';

import Kaspi from './MakePayForm/Kaspi';
import CloudPay from './MakePayForm/CloudPay';
import Button from '../../components/ui/Button';

class MakePay extends Component {
  state = {
    showModal: false,
    webView: null,
  };

  togglePay = item => {
    //console.log('ID', item.webView);
    this.setState({ showModal: true, webView: item.webView });
  };

  renderModal = () => {
    return (
      <View>
        <Modal visible={this.state.showModal} animationType="slide" transparent={false}>
          {this.state.webView}
          <Button
            onPress={() => this.setState({ showModal: false, webView: null })}
            title="Закрыть"
          />
        </Modal>
      </View>
    );
  };

  render() {
    //console.log('🐞: MakePay -> props', this.props);
    const { navigation, mainColor } = this.props;
    let dataTabs = [
      {
        id: 1,
        active: true,
        srcImage: (
          <Image
            style={{ tintColor: mainColor }}
            source={require('qbike-app/assets/images/kaspiBank.png')}
          />
        ),
        webView: <Kaspi />,
      },
      {
        id: 2,
        active: false,
        srcImage: (
          <Image
            style={{ tintColor: mainColor }}
            source={require('qbike-app/assets/images/qiwiBank.png')}
          />
        ),
        webView: <CloudPay />,
      },
    ];

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Оплата тарифа">
        <StatusBar backgroundColor="#F9F8F7" />

        <View style={Styles.wrapper}>
          {dataTabs.map((item, key) => (
            <TouchableOpacity
              key={'pay' + key}
              style={{ ...Styles.item, borderColor: mainColor }}
              onPress={() => {
                this.togglePay(item);
              }}
            >
              {item.srcImage}
            </TouchableOpacity>
          ))}
          {this.state.showModal && this.renderModal()}
        </View>
      </DropdownMenuLayout>
    );
  }
}

const Styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  item: {
    width: 140,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    // borderColor: '#67A960',
    backgroundColor: '#F9F8F7',
  },
});

export default connect(({ themeChanger }) => ({
  mainColor: themeChanger.main_color,
}))(MakePay);
