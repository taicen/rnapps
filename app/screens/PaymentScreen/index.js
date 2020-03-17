import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchPayments } from '../../../redux/payments';
// import { profileData } from '../../../redux/profile';
import moment from 'moment';

import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import { BottomTabs, BottomBlock } from '../../components/blocks';
import PaymentCard from './PaymentCard';
import { fonts } from '../../constants';
import { whiteWrapper, shadowBoxStyles, shadowBoxStylesLight } from '../../styles';
import { ArrowDown, FilterIcon } from '../../components/svg';

const data = [
  { label: 'Все', value: 0, field: 'all' },
  { label: 'Пополнения', value: 1, field: 'refill' },
  { label: 'Продления', value: 2, field: 'renewal' },
];

const dropdownStyle = {
  fontSize: 16,
  fontFamily: fonts.OpenSansSemibold,
  color: '#54575A',
};
class PaymentScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeFilter: false,
      activeField: 'all',
      page: 1,
    };
  }

  _handleLoadMore = () => {
    const {
      fetchPayments,
      payments: { payment_list, payment_count },
    } = this.props;
    if (payment_list.length < payment_count) {
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
        }),
        () => {
          fetchPayments(this.state.page);
        },
      );
    }
  };

  renderFooter = () => {
    const {
      payments: { load_more_in_progress },
    } = this.props;
    return (
      <View>{load_more_in_progress && <ActivityIndicator size="large" color="#67A960" />}</View>
    );
  };

  componentDidMount() {
    const { fetchPayments, profile_data, profileData } = this.props;
    const { page } = this.state;
    fetchPayments(page);
    // if (!profile_data) {
    //   profileData();
    // }
  }

  renderFilter = () => {
    const { activeFilter, activeField } = this.state;
    let activeFieldName = data.find(x => x.field === activeField).label;
    return (
      <View
        style={[
          {
            //position: 'relative',
            //zIndex: 20000,
            justifyContent: 'flex-end',
            marginBottom: 15,
          },
        ]}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          onPress={() => {
            this.setState({ activeFilter: !this.state.activeFilter });
          }}
        >
          <FilterIcon />
          <Text
            style={[
              dropdownStyle,
              {
                marginLeft: 5,
                borderColor: 'transparent',
                borderBottomColor: '#54575A',
                borderWidth: 1,
                fontFamily: fonts.OpenSansBold,
                display: 'flex',
              },
            ]}
          >
            {activeFieldName}
          </Text>
        </TouchableOpacity>

        {activeFilter && (
          <View style={[styles.filterDropdown, shadowBoxStylesLight]}>
            {data.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.filterListItem}
                onPress={() => {
                  this.setState({
                    activeField: item.field,
                    activeFilter: false,
                  });
                }}
              >
                <Text
                  style={[
                    dropdownStyle,
                    { color: activeField == item.field ? '#67a960' : '#54575A' },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  render() {
    const {
      navigation,
      payments: { payment_list, fetch_payments_in_progress },
    } = this.props;
    console.log('🐞: PaymentScreen -> render -> this.props', this.props);
    const { activeField, activeFilter, page } = this.state;
    let filtered_list;

    if (activeField == 'all') {
      filtered_list = payment_list;
    } else {
      filtered_list = payment_list && payment_list.filter(item => item.type == activeField);
    }

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Платежи">
        {fetch_payments_in_progress ? (
          <ActivityIndicator size="large" color="#67A960" />
        ) : (
          <TouchableWithoutFeedback
            onPress={() => {
              activeFilter && this.setState({ activeFilter: false });
            }}
          >
            <View style={whiteWrapper}>
              <Text style={styles.title}>Платежи</Text>
              <Text style={styles.subTitle}>История платежей</Text>

              {this.renderFilter()}

              <FlatList
                style={{ marginBottom: 100 }}
                data={filtered_list}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      this.setState({ activeFilter: false });
                      navigation.navigate('SinglePayment', {
                        id: item.id,
                        parent: navigation.state.routeName,
                      });
                    }}
                    key={item.id}
                  >
                    <PaymentCard
                      title={item.title_ru || 'Без названия'}
                      date={moment(new Date(item.date)).format('DD.MM.YYYY')}
                      amount={item.amount}
                      id={item.id}
                    />
                  </TouchableOpacity>
                )}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={this.renderFooter}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </DropdownMenuLayout>
    );
  }
}

// export default connect(
//   ({ payments }) => ({
//     payments
//   }),
//   dispatch => bindActionCreators({ fetchPayments, profileData }, dispatch)
// )(PaymentScreen);
export default PaymentScreen;

const styles = StyleSheet.create({
  title: {
    color: '#54575A',
    fontSize: 22,
    fontFamily: fonts.RobotoSlabBold,
    marginBottom: 5,
  },
  subTitle: {
    color: '#54575A',
    fontSize: 18,
    fontFamily: fonts.RobotoSlabRegular,
    marginBottom: 15,
  },
  filterDropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    width: 245,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
    paddingBottom: 5,
    paddingTop: 5,
    borderRadius: 4,
    zIndex: 211,
  },
  filterListItem: {
    //width: '100%',
    //position: 'relative',
    //flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    //justifyContent: 'flex-end',
    //alignItems: 'flex-end',
    //zIndex: 222
  },
});
