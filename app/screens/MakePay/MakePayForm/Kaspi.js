import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
class Kaspi extends Component {
  render() {
    return (
      <WebView
        ref={ref => (this._webview = ref)}
        originWhitelist={['*']}
        source={{ uri: 'https://kaspi.kz' }}
        javaScriptEnabled={true}
      />
    );
  }
}

export default Kaspi;
