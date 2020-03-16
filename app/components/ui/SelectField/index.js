import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import { ArrowDown } from '../../svg';

class SelectField extends Component {
  state = {
    selected: null
  };

  componentDidMount() {
    const { input } = this.props;
    input.value && this.setState({ selected: input.value });
  }

  render() {
    const { input, items, label, placeholder, onValueChange, key, defaultValue } = this.props;

    return (
      <View style={styles.selectFieldWrap}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.picker}>
          <RNPickerSelect
            placeholder={{
              label: placeholder || '...',
              value: null
            }}
            value={this.state.selected}
            items={items}
            style={{
              inputIOS: {
                fontSize: 16,
                paddingVertical: 6,
                paddingHorizontal: 0,
                borderWidth: 0,
                borderRadius: 0,
                color: '#54575A',
                paddingRight: 30 // to ensure the text is never behind the icon
              },
              inputAndroid: {
                flex: 1,
                width: '100%',
                fontSize: 16,
                paddingHorizontal: 0,
                paddingVertical: 6,
                borderWidth: 0,
                borderRadius: 0,
                color: '#54575A',
                paddingRight: 30
              },
              iconContainer: {
                top: 10,
                right: 0
              }
            }}
            useNativeAndroidPickerStyle={false}
            onValueChange={value => {
              onValueChange && onValueChange(value);
              input.onChange(value);
              this.setState({ selected: value });
            }}
            itemKey={key}
            Icon={() => {
              return <ArrowDown />;
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selectFieldWrap: {
    position: 'relative',
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    width: '65%'
  },
  label: {
    color: '#54575A',
    marginBottom: 10
  },
  picker: {
    flex: 1,
    // alignItems: 'flex-start',
    width: '100%',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#54575A'
    // paddingRight: 30
  }
});

export default SelectField;
