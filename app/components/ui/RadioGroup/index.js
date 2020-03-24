import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';

export default class RadioGroup extends Component {
  state = {
    radioButtons: this.validate(this.props.radioButtons),
    // borderColor: this.props.borderColor,
    bgColor: this.props.bgColor || '#00a5b4',
    size: this.props.size || 24,
  };

  validate(data) {
    let selected = false; // Variable to check if "selected: true" for more than one button.

    data.map(e => {
      // e.color = e.color ? e.color : '#444';
      e.disabled = e.disabled ? e.disabled : false;
      e.label = e.label ? e.label : 'You forgot to give label';
      // e.labelColor = e.labelColor ? e.labelColor : '#444';
      // e.labelStyles = e.labelStyles ? e.labelStyles : { color: '#444' };
      // e.layout = e.layout ? e.layout : 'row';
      e.selected = e.selected ? e.selected : false;

      if (e.selected) {
        if (selected) {
          e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
          //console.log('Found "selected: true" for more than one button');
        } else {
          selected = true;
        }
      }

      // e.size = e.size ? e.size : 24;
      e.value = e.value ? e.value : e.label;
    });

    return data;
  }

  onPress = label => {
    const { radioButtons } = this.state;
    const labelIndex = radioButtons.findIndex(e => e.label == label);

    radioButtons.map(data => (data.selected = false));
    radioButtons[labelIndex].selected = true;

    this.setState({ radioButtons }, () => this.props.onPress(radioButtons));
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {this.state.radioButtons.map(item => (
            <RadioButton
              key={item.label}
              data={item}
              onPress={this.onPress}
              labelStyles={this.props.labelStyles}
              color={this.state.bgColor}
              size={this.state.size}
            />
          ))}
        </View>
      </View>
    );
  }
}

const RadioButton = ({ data, labelStyles, onPress, ...props }) => {
  const opacity = data.disabled ? 0.2 : 1;

  let layout = { flexDirection: 'row' };
  let margin = { marginLeft: 0 };

  if (data.layout === 'column') {
    layout = { alignItems: 'center' };
    margin = { marginTop: 10 };
  }

  return (
    <TouchableOpacity
      style={[styles.item, layout, { opacity, marginHorizontal: 10 }]}
      onPress={() => {
        data.disabled ? null : onPress(data.label);
      }}
    >
      <Text style={[styles.title, { alignSelf: 'center' }, margin, labelStyles]}>{data.label}</Text>
      <View
        style={[
          styles.border,
          {
            borderColor: '#d3d3d3',
            width: props.size,
            height: props.size,
            borderRadius: props.size / 2,
          },
        ]}
      >
        {data.selected && (
          <View
            style={{
              backgroundColor: props.color,
              width: props.size / 2,
              height: props.size / 2,
              borderRadius: props.size / 2,
            }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    display: 'flex',
    //flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center'
  },
  title: {
    fontSize: 14,
    marginBottom: 0,
    color: '#191D30',
    marginLeft: 10,
  },
});
