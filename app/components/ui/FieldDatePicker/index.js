import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { fonts } from '../../../constants';

class FieldDatePicker extends Component {
  state = {
    date: ''
  };

  render() {
    const {
      input,
      label,
      mode,
      placeholder,
      androidMode,
      formatDate,
      minDate,
      maxDate,
      showIcon
    } = this.props;

    return (
      <View style={styles.containerStyle}>
        <Text style={styles.labelStyle}>{label}</Text>
        <DatePicker
          style={{ width: 200 }}
          date={this.state.date}
          mode={mode || 'date'}
          placeholder={placeholder || '...'}
          androidMode={androidMode || 'default'}
          format={formatDate || 'YYYY-MM-DD'}
          minDate={minDate || '1950-01-01'}
          maxDate={maxDate || '2019-01-01'}
          showIcon={showIcon ? true : false}
          confirmBtnText="Подтвердить"
          cancelBtnText="Закрыть"
          customStyles={{
            dateTouchBody: {
              flex: 1,
              width: '100%'
            },
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: showIcon ? 36 : 0,
              height: 40,
              borderColor: '#D3D3D3',
              borderWidth: 1,
              borderRadius: 5,
              paddingLeft: 0
            },
            dateText: {
              fontFamily: fonts.OpenSans,
              fontSize: 16,
              lineHeight: 22,
              color: '#54575A'
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ date });
            input && input.onChange(date);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 15,
    width: '100%'
  },
  labelStyle: {
    lineHeight: 26,
    color: '#54575A'
  }
});

export default FieldDatePicker;
