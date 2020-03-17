import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';

import ModalComponent from '../../Modal';

import { shadowBoxStyles } from '../../../styles';
import { fonts, viewportHeight, viewportWidth, statusBarHeight } from '../../../constants';
import { ArrowDown, ArrowBackSmall } from '../../svg';

const data = [
  { label: 'Профиль', value: 0, screenName: 'Profile' },
  { label: 'Уведомления', value: 1, screenName: 'Notification' },
  { label: 'Поездки', value: 2, screenName: 'AllRoutes' },
  { label: 'Тариф', value: 3, screenName: 'Tariffs' },
  { label: 'Платежи', value: 4, screenName: 'Payment' },
  { label: 'Избранное', value: 5, screenName: 'Favorites' }
];

const mapStateToProps = state => ({
  ...state.modal
});

const defaultStyles = {
  flex: 1,
  position: 'relative',
  width: viewportWidth,
  height: viewportHeight,
  marginTop: Platform.OS === 'ios' ? statusBarHeight : 0,
  backgroundColor: '#F9F8F7'
};

const dropdownStyle = {
  fontSize: 16,
  fontFamily: fonts.OpenSansSemibold,
  color: '#54575A',
  textTransform: 'uppercase',
  letterSpacing: 1
};

class DropdownMenuLayout extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      active: false,
      activeIndex: null
    };
  }

  componentDidUpdate(prevState) {
    const { activeIndex } = this.state;
    if (prevState.activeIndex !== activeIndex) {
      const temp = data[activeIndex];
      // eslint-disable-next-line prefer-destructuring
      data[activeIndex] = data[0];
      data[0] = temp;
    }
  }

  backHandler = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  // renderDropDown = navigation => {
  //   const { active } = this.state;

  //   let activeScreen;
  //   let activeScreenName = '';
  //   let dropdownData;

  //   // navigation.state.params.parent
  //   console.log('🐞: DropdownMenuLayout -> navigation.state.params.parent', navigation.state);

  //   if (navigation.state && navigation.state.params.key) {
  //     activeScreen = data.find(x => {
  //       console.log('🐞: DropdownMenuLayout -> x', x);
  //       return x.screenName === navigation.state.key;
  //     });
  //     console.log('🐞: DropdownMenuLayout -> if true -> activeScreen', activeScreen);
  //     dropdownData = data.filter(item => item.screenName !== navigation.state.routeName);
  //     console.log('🐞: DropdownMenuLayout -> if true -> dropdownData', dropdownData);
  //   } else {
  //     activeScreen = data.find(x => x.screenName === navigation.state.routeName);
  //     console.log('🐞: DropdownMenuLayout -> if false -> activeScreen', activeScreen);
  //     dropdownData = data.filter(item => item.screenName !== navigation.state.routeName);
  //     console.log('🐞: DropdownMenuLayout -> if false -> dropdownData', dropdownData);
  //   }
  //   activeScreenName = activeScreen && activeScreen.label;

  //   return (
  //     <View
  //       style={[
  //         {
  //           width: '100%',
  //           position: 'relative',
  //           paddingHorizontal: 10,
  //           paddingTop: 10,
  //           height: active ? '100%' : 50,
  //           zIndex: 20
  //         },
  //         shadowBoxStyles
  //       ]}
  //     >
  //       <TouchableOpacity
  //         activeOpacity={1}
  //         style={{
  //           width: '100%',
  //           height: 50,
  //           borderTopLeftRadius: 25,
  //           borderTopRightRadius: 25,
  //           borderBottomLeftRadius: !active ? 5 : 0,
  //           borderBottomRightRadius: !active ? 5 : 0,
  //           display: 'flex',
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'space-between',
  //           paddingHorizontal: 20,
  //           backgroundColor: '#ffffff'
  //         }}
  //         onPress={() => {
  //           this.setState(state => ({ active: !state.active }));
  //         }}
  //       >
  //         <Text style={dropdownStyle}>{activeScreenName}</Text>
  //         <ArrowDown />
  //       </TouchableOpacity>
  //       {active && (
  //         <View
  //           style={{
  //             position: 'relative',
  //             width: '100%',
  //             display: 'flex',
  //             flexDirection: 'column',
  //             backgroundColor: '#ffffff',
  //             paddingBottom: 10,
  //             borderBottomLeftRadius: 20,
  //             borderBottomRightRadius: 20,
  //             zIndex: 21
  //           }}
  //         >
  //           {dropdownData.map(item => (
  //             <TouchableOpacity
  //               // key={item.screenName}
  //               style={{
  //                 width: '100%',
  //                 position: 'relative',
  //                 paddingHorizontal: 20,
  //                 paddingTop: 8,
  //                 paddingBottom: 12,
  //                 // paddingVertical: 10,
  //                 zIndex: 22
  //               }}
  //               onPress={() => {
  //                 navigation.navigate(item.screenName);
  //                 this.setState({
  //                   // activeScreen: item.screenName,
  //                   active: false
  //                 });

  //                 // this.setState({ active: false }, () => navigation.navigate(item.screenName));
  //               }}
  //             >
  //               <Text style={dropdownStyle}>{item.label}</Text>
  //             </TouchableOpacity>
  //           ))}
  //         </View>
  //       )}
  //     </View>
  //   );
  // };

  // Плажка с названием скрина, который приходит с пропса - screenName и стрелкой назад если пропс - arrowBack = true (прим. скрин настроек или редактирование профиля)
  renderSingle = (navigation, screenName, arrowBack) => {
    if (!screenName) screenName = 'Some screen';
    return (
      <View
        style={[
          {
            width: '100%',
            position: 'relative',
            paddingHorizontal: 10,
            paddingTop: 10,
            height: 50,
            zIndex: 20
          },
          shadowBoxStyles
        ]}
      >
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
            backgroundColor: '#ffffff'
          }}
          onPress={arrowBack && this.backHandler}
        >
          {arrowBack ? <ArrowBackSmall /> : null}
          <Text
            style={{
              fontSize: 16,
              color: '#54575A',
              marginLeft: arrowBack ? 20 : 10,
              textTransform: 'uppercase'
            }}
          >
            {screenName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { children, navigation, screenName, noDropdown, arrowBack, transparent } = this.props;
    console.log("TCL: DropdownMenuLayout -> render -> screenName", screenName)

    return (
      <View style={{ ...defaultStyles }}>
        {this.renderSingle(navigation, screenName, arrowBack)}
        {/* {noDropdown
          ? this.renderSingle(navigation, screenName, arrowBack)
          : this.renderDropDown(navigation)} */}
        <View
          style={{
            position: 'absolute',
            top: 80,
            left: 10,
            right: 10,
            bottom: 90,
            zIndex: 2,
            borderRadius: transparent ? 0 : 15,
            overflow: 'hidden'
          }}
        >
          {children}
        </View>
        <ModalComponent />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(DropdownMenuLayout);
