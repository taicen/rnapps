import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class CloudPay extends Component {
  render() {
    return (
      <WebView
        ref={ref => (this._webview = ref)}
        originWhitelist={['*']}
        source={{ uri: 'https://velobike.kz' }}
        javaScriptEnabled={true}
      />
    );
  }
}

export default CloudPay;
