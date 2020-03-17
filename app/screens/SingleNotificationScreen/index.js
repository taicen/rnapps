import React, { Component } from 'react';
import { View, Text } from 'react-native';
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

class SingleNotificationScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  backHandler = e => {
    this.props.navigation.goBack();
  };

  componentWillMount() {
    const { notifications, fetchNotifications } = this.props;
    if (!notifications) {
      fetchNotifications();
    }
  }

  render() {
    const {
      navigation,
      notifications: { notification_list, fetch_notifications_in_progress },
    } = this.props;
    const { id } = navigation.state.params;

    const notifications =
      notification_list &&
      Object.entries(notification_list).map(([key, value]) => {
        return {
          ...value,
          id: key,
        };
      });

    const currentNotification = notifications.find(x => x.id === id);
    // console.log('navigation', navigation)
    return (
      <DropdownMenuLayout navigation={navigation} screenName="Уведомления">
        <View style={{ ...notificationWrap }}>
          <BackButton title="Назад" onPress={this.backHandler} />
          <Text style={{ ...notificationTitle }}>
            {currentNotification.title_ru || 'Без названия'}
          </Text>
          <Text style={{ ...notificationDate }}>
            {moment(new Date(currentNotification.date_create)).format('DD.MM.YYYY')}
          </Text>
          <Text style={{ ...notificationContent }}>{currentNotification.description_ru}</Text>
        </View>
        {/* <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock>  */}
      </DropdownMenuLayout>
    );
  }
}

const notificationWrap = {
  paddingVertical: 25,
  paddingHorizontal: 20,
  backgroundColor: '#ffffff',
  borderRadius: 15,
  height: '85%',
};

const notificationTitle = {
  fontFamily: fonts.RobotoSlabBold,
  fontSize: 22,
  color: '#54575A',
  marginTop: 10,
  marginBottom: 20,
};

const notificationDate = {
  fontSize: 10,
  color: '#949BA1',
  marginBottom: 20,
};

const notificationContent = {
  fontSize: 14,
  color: '#1F2021',
  lineHeight: 18,
};

export default SingleNotificationScreen;
