import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTariffs, getCardsInfo } from '../../redux/tariffs';
import { profileData } from '../../redux/profile';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Button } from '../../components/ui';
import { Style } from './styles';
import TariffItem from './TariffItem';

const data = [
  {
    status: 'НОВИНКА',
    duration: 'year',
    label: 'Годовой пропуск',
    oldCost: '12 000 Т',
    newCost: '10 000 Т',
    desc:
      'Катайтесь круглый год. Первые 30 минут проката бесплатны. Поездки более 30 мин включают в себея почасовую оплату',
  },
  {
    status: 'ВЫГОДНЫЙ',
    duration: 'quarter',
    label: '3 месяца пропуска',
    oldCost: '3 000 Т',
    newCost: '2 500 Т',
    desc:
      'Пропуск на 90 дней. \n Первые 30 минут проката бесплатны. Поездки более 30 мин включают в себея почасовую оплату',
  },
  {
    status: null,
    duration: 'month',
    label: 'Месячный пропуск',
    oldCost: '12 000 Т',
    newCost: '10 000 Т',
    desc:
      'Пропуск на 90 дней. \n Первые 30 минут проката бесплатны. Поездки более 30 мин включают в себея почасовую оплату',
  },
];

let token;
AsyncStorage.getItem('user_token').then(tkn => {
  token = tkn;
  // console.log(token);
});

class TariffsScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      parsedDates: {
        leftDays: 0,
        leftHours: 0,
      },
      status: true,
    };
  }

  parseDate = () => {
    const { cardsIsLoaded, cards } = this.props;
    if (cardsIsLoaded && cards.active) {
      const month = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
      ];
      const startDate = cards.active.start_date;
      const endDate = cards.active.end_date;
      const parsedStartDate = new Date(startDate);
      const parsedEndDate = new Date(endDate);
      const inequality = Date.parse(endDate) - Date.parse(startDate);
      const parsedLeftDays = Math.ceil(inequality / (1000 * 60 * 60 * 24));
      const parsedLeftHours = Math.floor((inequality % 86400000) % 3600000);
      this.setState({
        parsedDates: {
          startDay: parsedStartDate.getDate(),
          startMonth: month[parsedStartDate.getMonth()],
          startYear: parsedStartDate.getFullYear(),
          endDay: parsedEndDate.getDate(),
          endMonth: month[parsedEndDate.getMonth()],
          endYear: parsedEndDate.getFullYear(),
          leftDays: parsedLeftDays,
          leftHours: parsedLeftHours,
        },
      });
    }
  };

  toggleStatus = () => {
    this.setState(prevState => {
      return { ...prevState, status: !prevState.status };
    });
  };

  componentWillMount() {
    const { getTariffs, profileData, getCardsInfo, user_token } = this.props;
    const dataToSend = {
      // Use test token of another user to test
      token: token, //'NmFrVmViT01NaUdmQXBRK3ZsemJYZz09'
    };
    profileData();
    getTariffs();
    getCardsInfo({ ...dataToSend });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cardsIsLoaded !== this.props.cardsIsLoaded) {
      this.parseDate();
    }
  }

  render() {
    const { navigation, profile, tariffs, isLoaded, cardsIsLoaded, cards, mainColor } = this.props;
    const {
      parsedDates: {
        startDay,
        startMonth,
        startYear,
        endDay,
        endMonth,
        endYear,
        leftDays,
        leftHours,
      },
    } = this.state;

    if (!cardsIsLoaded) return null;

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Тарифы">
        <TouchableOpacity style={Style.status} onPress={this.toggleStatus}>
          <View>
            <Text style={Style.item}>Резидент</Text>
          </View>
          <Switch
            onValueChange={this.toggleStatus}
            trackColor={{ false: '#B4B4B4', true: mainColor }}
            thumbColor="#ffffff"
            value={this.state.status}
          />
        </TouchableOpacity>
        <ScrollView>
          {isLoaded && cardsIsLoaded ? (
            <Fragment>
              {cards.active && (
                <View style={Style.stat}>
                  <Text style={Style.label}>Дата начала абонемента</Text>
                  {startDay && startMonth && startYear ? (
                    <Text style={Style.item}>
                      {startDay} {startMonth} {startYear}
                    </Text>
                  ) : (
                    <Text>- - -</Text>
                  )}
                  <Text style={Style.label}>Дата окончание абонемента</Text>
                  {endDay && endMonth && endYear ? (
                    <Text style={Style.item}>
                      {endDay} {endMonth} {endYear}
                    </Text>
                  ) : (
                    <Text>- - -</Text>
                  )}
                  {/* 
                  <== === MAYBE IT WILL BE NEEDED === ==>

                  <Text style={Style.label}>Бонусы абонемента:</Text>
                  <Text style={Style.item}>- Пропуск на 90 дней.</Text>
                  <Text style={Style.item}>- Первые 30 минут проката бесплатны.</Text>
                  <Text style={Style.item}>
                    - Поездки более 30 мин включают в себея почасовую оплату.
                  </Text> 
                */}

                  <View style={Style.statDesc}>
                    <Text style={Style.label}>До окончания действия абонемента осталось:</Text>
                    <Text style={Style.statLabel}>
                      {leftDays} дней и {leftHours} часов
                    </Text>
                    <Button
                      onPress={() => navigation.navigate('MakePay')}
                      title="Продлить абонемент"
                    />
                  </View>
                </View>
              )}
              <Text style={Style.h1}>Оформить новый</Text>
              {cardsIsLoaded &&
                profile != null &&
                // (profile.iin && !profile.passport
                (!this.state.status
                  ? tariffs.sms.map((item, i) => (
                      // тарифы для нерезидентов
                      /*  
                        <== PROPS OF THIS COMPONENT  ==> 
                          - name - the name of the tariff,
                          - comment - the comment of description of the tariff
                          - price - price of the comment
                          - order - order of elements to render image
                        <== END ==> 
                      */
                      <TariffItem
                        order={i}
                        name={item.name_ru}
                        price={item.price}
                        comment={item.comment_ru}
                        key={item.id}
                        navigation={navigation}
                      />
                    ))
                  : tariffs.rfid.map((item, i) => (
                      <TariffItem
                        order={i}
                        name={item.name_ru}
                        price={item.price}
                        comment={item.comment_ru}
                        key={item.id}
                        navigation={navigation}
                      />
                    )))}
            </Fragment>
          ) : (
            <ActivityIndicator
              style={{ height: '100%', marginTop: 20 }}
              size="large"
              color="#67A960"
            />
          )}
        </ScrollView>
      </DropdownMenuLayout>
    );
  }
}

export default connect(
  ({ themeChanger, tariffs, profile }) => ({
    tariffs: tariffs.tariffs_data,
    isLoaded: tariffs.tariffs_loaded,
    cardsIsLoaded: tariffs.cards_loaded,
    cards: tariffs.cards_data,
    profile: profile.profile_data,
    user_token: profile.profile_token,
    mainColor: themeChanger.main_color,
  }),
  dispatch =>
    bindActionCreators(
      {
        getTariffs,
        getCardsInfo,
        profileData,
      },
      dispatch,
    ),
)(TariffsScreen);
