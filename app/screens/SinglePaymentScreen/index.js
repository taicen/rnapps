import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { BottomTabs, BottomBlock } from '../../components/blocks';
import { BackButton } from '../../components/ui/BackButton';
import { fonts } from '../../constants';
import { connect } from 'react-redux';
import moment from 'moment';

const data = {
  id: 1,
  title: 'Истекает срок подписки ',
  date: '12.04.2019',
  description:
    'Скоро истечет подписка на тарифныый план «3 месяца пропуска». Тарифный план истечет 16.04.2019 в 15:12. \n\n Если желаете продлить свой тарифный план, то просто пройдите по этой ссылке и переоформите тариф. Оставшееся время предыдущего тарифа перейдет на следующий.',
};

class SinglePaymentScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  backHandler = e => {
    this.props.navigation.goBack();
  };

  componentDidMount() {
    const { getPayment, navigation } = this.props;
    const { id } = navigation.state.params;
    getPayment(id);
  }

  render() {
    const {
      navigation,
      payments: { payment, get_payment_in_progress },
      profile_data,
    } = this.props;

    // const payment = payment_list.find(x => x.id === id);

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Платежи">
        {get_payment_in_progress || payment === null ? (
          <ActivityIndicator size="large" color="#67A960" />
        ) : (
          <View style={{ ...paymentWrap }}>
            <BackButton title="Назад к платежам" onPress={this.backHandler} />
            <Text style={styles.title}>{payment.title_ru || 'Без названия'}</Text>
            <Text style={styles.subTitle}>Рецепт</Text>
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowTitle]}>Дата</Text>
              <Text style={styles.rowText}>
                {moment(new Date(payment.date)).format('DD.MM.YYYY')}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowTitle]}>Номер платежа</Text>
              <Text style={styles.rowText}>{payment.id}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowTitle]}>Способ оплаты</Text>
              <Text style={styles.rowText}>{payment.operator}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowTitle]}>Покупатель</Text>
              <Text style={styles.rowText}>{profile_data && profile_data.name}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.rowText, styles.rowTitle]}>Эл. адрес</Text>
              <Text style={styles.rowText}>{profile_data && profile_data.email}</Text>
            </View>
          </View>
        )}
      </DropdownMenuLayout>
    );
  }
}

const paymentWrap = {
  paddingVertical: 25,
  paddingHorizontal: 20,
  backgroundColor: '#ffffff',
  borderRadius: 15,
  // height: "85%"
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: fonts.RobotoSlabBold,
    marginBottom: 15,
    color: '#54575A',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: fonts.RobotoSlabRegular,
    marginBottom: 15,
    color: '#54575A',
  },
  tableRow: {
    flexDirection: 'row',
  },
  rowTitle: {
    color: '#949BA1',
  },
  rowText: {
    width: '50%',
    fontSize: 12,
    marginBottom: 14,
    color: '#1F2021',
  },
});

export default SinglePaymentScreen;
