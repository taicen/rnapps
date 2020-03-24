import React, { Component } from 'react';
import { TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';

import { connect } from 'react-redux';
import moment from 'moment';

import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
// import { BottomTabs, BottomBlock } from "../../blocks";
import NotificationCart from './NotificationCard';
import { withNavigationFocus } from 'react-navigation';
class NotificationScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  state = {
    page: 1,
  };

  componentDidMount() {
    this._fetchNotifications();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.isFocused && this._fetchNotifications();
    }
  }

  _fetchNotifications = () => {
    const { fetchNotifications, token } = this.props;
    const { page } = this.state;
    fetchNotifications({ page, token });
  };

  _handleLoadMore = () => {
    const {
      token,
      fetchNotifications,
      notifications: { notification_list, notification_count, load_more_in_progress },
    } = this.props;

    if (Object.entries(notification_list).length < notification_count && !load_more_in_progress) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
        }),
        () => {
          fetchNotifications({ page: this.state.page, token });
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

    //notifications && console.log(notifications.length);

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
                  date={moment(new Date(item.date_create.split(' ')[0])).format('DD.MM.YYYY')}
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

export default connect(({ profile }) => ({
  token: profile.profile_token || null,
}))(withNavigationFocus(NotificationScreen));
