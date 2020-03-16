import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';

import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
// import { BottomTabs, BottomBlock } from "../../blocks";
import NotificationCart from './NotificationCard';

const date = [
  {
    id: 1,
    title: 'Новый тариф',
    date: '12.04.2019',
    description: 'Поздравляем с приобретением нового тарифного плана «3 месяца пропуска»',
  },
  {
    id: 2,
    title: 'Пополнение баланса',
    date: '12.04.2019',
    description: 'Вы успешно пополнили свой балан на 1200 тенге через...',
  },
  {
    id: 3,
    title: 'Истекает срок подписки',
    date: '12.04.2019',
    description: 'Скоро истечет подписка на тарифныый план',
  },
  {
    id: 4,
    title: 'Новый тариф',
    date: '12.04.2019',
    description: 'Поздравляем с приобретением нового тарифного плана «3 месяца пропуска»',
  },
];

class NotificationScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { fetchNotifications } = this.props;
    const { page } = this.state;
    fetchNotifications(page);
  }

  _handleLoadMore = () => {
    const {
      fetchNotifications,
      notifications: { notification_list, notification_count, load_more_in_progress },
    } = this.props;
    console.log(Object.entries(notification_list).length, notification_count);
    if (Object.entries(notification_list).length < notification_count && !load_more_in_progress) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
        }),
        () => {
          fetchNotifications(this.state.page);
        },
      );
    }
  };

  renderFooter = () => {
    const {
      notifications: { load_more_in_progress },
    } = this.props;
    return (
      <View>{load_more_in_progress && <ActivityIndicator size="large" color="#67A960" />}</View>
    );
  };

  render() {
    const {
      navigation,
      notifications: { notification_list, fetch_notifications_in_progress },
    } = this.props;

    const notifications =
      notification_list &&
      Object.entries(notification_list).map(([key, value]) => {
        return {
          ...value,
          id: key,
        };
      });

    notifications && console.log(notifications.length);

    // const yourDate = new Date()
    // // console.log('yourDate', yourDate)
    // const NewDate = moment(yourDate).format("DD.MM.YYYY")
    // console.log(NewDate)

    return (
      <DropdownMenuLayout navigation={navigation} transparent screenName="Уведомления">
        {fetch_notifications_in_progress ? (
          <ActivityIndicator size="large" color="#67A960" />
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate('SingleNotification', {
                    id: item.id,
                    parent: navigation.state.routeName,
                  })
                }
                key={item.id}
              >
                <NotificationCart
                  title={item.title_ru || 'Без названия'}
                  date={moment(new Date(item.date_create)).format('DD.MM.YYYY')}
                  description={item.description_ru}
                />
              </TouchableOpacity>
            )}
            onEndReached={this._handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={this.renderFooter}
          />
        )}

        {/* <BottomBlock>
          <BottomTabs navigation={navigation} />
        </BottomBlock> */}
      </DropdownMenuLayout>
    );
  }
}

export default connect()(NotificationScreen);
