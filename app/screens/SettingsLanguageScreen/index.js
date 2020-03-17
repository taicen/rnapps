import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
// import { BottomTabs, BottomBlock } from '../../blocks';
import { RadioGroup } from '../../components/ui';

// const data = [
//   {
//     label: 'Қазақша',
//     value: false
//   },
//   {
//     label: 'Русский',
//     value: false
//   },
//   {
//     label: 'English',
//     value: false
//   }
// ];

class SettingsLanguageScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    data: [
      {
        label: 'Қазақша',
        value: 'kz_KZ',
        selected: false,
      },
      {
        label: 'Русский',
        value: 'ru_RU',
        selected: true,
      },
      {
        label: 'English',
        value: 'en_EN',
        selected: false,
      },
    ],
  };

  onPress = data => this.setState({ data });

  render() {
    const { navigation } = this.props;
    return (
      <DropdownMenuLayout navigation={navigation} noDropdown screenName="Язык" arrowBack>
        <View style={styles.main}>
          <RadioGroup
            radioButtons={this.state.data}
            onPress={this.onPress}
            bgColor="#00a5b4"
            size={24}
          />
          {/* <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <Checkbox
                  onChange={() => {
                    item.state ? true : false;
                  }}
                />
              </TouchableOpacity>
            )}
          /> */}
        </View>
        {/* <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock> */}
      </DropdownMenuLayout>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  item: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    color: '#191D30',
    marginBottom: 3,
  },
});

export default SettingsLanguageScreen;
