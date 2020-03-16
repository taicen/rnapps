import React, { Component } from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, Linking } from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from '../../ui';

import { SupportSubMenu } from './../partials';
import { StationIcon, BikeIcon, WalletsIcon, ExclaimIcon } from '../../svg';
import modalStyles from '../../../styles/ModalLists';
//import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
//import { getCallbackForm } from '../../../redux/support';

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       getCallbackForm
//     },
//     dispatch
//   );

const mapStateToProps = state => ({
  callbackForm: state.support.callbackForm,
  mainColor: state.themeChanger.main_color,
});

class SupportMenu extends Component {
  state = {
    callbackForm: {},
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  componentDidMount() {
    // this.props.getCallbackForm();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      callbackForm: nextProps.callbackForm,
    });
  }

  renderHeader = (section, _, isActive) => {
    return (
      <View
        duration={100}
        style={[modalStyles.menuListItem, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <View style={modalStyles.menuListItemIcon}>{section.icon}</View>
        <View>
          <Text style={modalStyles.menuListItemTitle}>{section.name}</Text>
          <Text style={modalStyles.menuListItemDesc}>{section.subTitle}</Text>
        </View>
      </View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <View
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <SupportSubMenu
          title={section.title}
          data={section.type}
          dataObj={section.typeObj}
          activeSections={isActive ? section.category : ''}
        />
      </View>
    );
  }

  makeCall = phoneNumber => {
    let phone = '';
    const numb = phoneNumber || '+77084251495';
    if (Platform.OS !== 'android') {
      phone = `telprompt:${numb}`;
    } else {
      phone = `tel:${numb}`;
    }
    Linking.openURL(phone);
  };

  render() {
    const { multipleSelect, activeSections } = this.state;
    const { callbackForm, mainColor } = this.props;
    const defaultContent = {
      station: {
        icon: <StationIcon color={mainColor} />,
        subTitle: 'Проблемы со станцией',
      },
      payments: {
        icon: <WalletsIcon color={mainColor} />,
        subTitle: 'Затруднения в оплате',
      },
      bicycle: {
        icon: <BikeIcon color={mainColor} />,
        subTitle: 'Проблемы с велосипедом',
      },
      other: {
        icon: <ExclaimIcon color={mainColor} />,
        subTitle: 'Прочие жалобы',
      },
    };

    // for (let key in callbackForm) {
    //   let obj = callbackForm[key]
    //   let ccc = key
    //   for( let key2 in obj) {
    //     let obj2 = obj[key2]
    //     obj2.type = Object.values(obj2.type)
    //     // console.log({obj2})
    //     obj2 = Object.assign(obj2, defaultContent[ccc])
    //   }
    //   // console.log(key, obj)
    //   CONTENT.push(obj.ru)
    //   // console.log('CONTENT', CONTENT, obj.ru)
    // }

    const content = Object.entries(callbackForm).map(([key, value]) => {
      return {
        ...value['ru'],
        category: key,
        type: Object.values(value['ru'].type),
        typeObj: value['ru'].type,
        ...defaultContent[key],
      };
    });

    return (
      <KeyboardAwareScrollView>
        <View style={modalStyles.shadowContainer}>
          <View style={modalStyles.menuContainer}>
            <View style={modalStyles.menuHeaderContainerFlex}>
              <Image
                source={require('../../../../assets/images/help-avatar.png')}
                style={modalStyles.menuHeaderAvatar}
                resizeMode="cover"
              />
              <View>
                <Text style={modalStyles.menuHeaderText}>Вы можете позвонить нам напрямую</Text>
                <Button
                  title="Позвонить в техподдержку"
                  size="small"
                  style={{ marginTop: 15, marginBottom: 15 }}
                  onPress={() => {
                    this.makeCall();
                  }}
                />
                <Text style={modalStyles.menuHeaderText}>
                  или описать свою проблему выбрав раздел снизу
                </Text>
              </View>
            </View>
            <Accordion
              activeSections={activeSections}
              sections={content}
              touchableComponent={TouchableOpacity}
              expandMultiple={multipleSelect}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              duration={100}
              onChange={this.setSections}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: '#F9F9F9',
  },
  inactive: {
    backgroundColor: '#fff',
  },
});

export default connect(mapStateToProps)(SupportMenu);
