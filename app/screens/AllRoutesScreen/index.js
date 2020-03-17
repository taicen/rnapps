import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Animated,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllRoutes } from '../../redux/allRoutes';
import DropdownMenuLayout from '../../components/layouts/DropdownMenuLayout';
import SingleRouteCard from './SingleRouteCard';
import { FilterIcon } from '../../components/svg';
import { whiteWrapper, shadowBoxStylesLight } from '../../styles';
import { fonts } from '../../constants';

/*\ === TODO === /*\
  -> Display data of longest ride of the week
  -> Prevent loading if there is no data from API
  -> Make design valid loader on the bottom of scroll
\* <== END TODO ==> */

// Filter options
const data = [
  {
    name: 'По дате',
    value: 'departure_date',
  },
  {
    name: 'По продолжительности',
    value: 'duration',
  },
  {
    name: 'По расстоянию',
    value: 'covered_distance',
  },
];

// Get user token (there is the user token with roads data for test)
let token = '';

class AllRoutesScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      filterDropdownIsActive: false,
      filterDropdownActiveTitle: 'по дате',
      filterSortingValue: 'departure_date',
      mainData: [],
      dataLimit: 10,
      dataOffset: 0,
      isScrolling: false,
      loaderRotation: new Animated.Value(0),
    };
  }

  _handleLoadMore = () => {
    console.log(token);
    if (this.state.isScrolling) {
      this.setState(
        {
          dataLimit: this.state.dataLimit + 10,
          dataOffset: this.state.dataOffset + 1,
          isScrolling: false,
        },
        () => {
          this.props.getAllRoutes({
            token: token,
            data_sort: this.state.filterSortingValue,
            limit: this.state.dataLimit,
            offset: this.state.dataOffset,
          });
        },
      );
    }
  };

  async componentDidMount() {
    const { getAllRoutes, isLoaded } = this.props;
    const { filterSortingValue } = this.state;

    await AsyncStorage.getItem('user_token').then(tkn => {
      token = tkn;
    });
    console.log(token);

    const dataToSend = {
      token: token,
      data_sort: filterSortingValue,
      sort: 'DESC',
      limit: 10,
      offset: 0,
    };
    getAllRoutes({ ...dataToSend });
    if (!isLoaded) {
      this.setState({ initPage: false });
    }

    // this.laoderRotate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isLoaded !== this.props.isLoaded) {
      this.setState({
        mainData: this.props.allRoutes ? [...this.props.allRoutes] : [],
        loaded: true,
      });
    }
    // Fetch sorted data when sorting option was changed
    if (prevState.filterSortingValue !== this.state.filterSortingValue) {
      const { getAllRoutes, isLoaded } = this.props;
      const dataToSend = {
        token: token,
        data_sort: this.state.filterSortingValue,
        sort: 'DESC',
        limit: 10,
        offset: 0,
      };
      getAllRoutes({ ...dataToSend });
      this.setState({ initPage: false });
    }
  }

  renderFilter = () => {
    const { filterDropdownIsActive, filterDropdownActiveTitle, filterSortingValue } = this.state;
    let activeFieldName = data.find(x => x.value === filterSortingValue).name;
    return (
      <View
        style={[
          {
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
            paddingTop: 5,
          }}
          onPress={() => {
            this.setState({ filterDropdownIsActive: !this.state.filterDropdownIsActive });
          }}
        >
          <FilterIcon />
          <Text
            style={[
              dropdownStyle,
              {
                marginLeft: 5,
                fontFamily: fonts.OpenSansBold,
                display: 'flex',
              },
            ]}
          >
            {activeFieldName}
          </Text>
        </TouchableOpacity>

        {filterDropdownIsActive && (
          <View style={[styles.filterDropdown, shadowBoxStylesLight]}>
            {data.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={styles.filterListItem}
                onPress={() => {
                  this.setState({
                    filterDropdownIsActive: false,
                    filterDropdownActiveTitle: item.name,
                    filterSortingValue: item.value,
                  });
                }}
              >
                <Text
                  style={[
                    dropdownStyle,
                    {
                      textDecorationLine: 'none',
                      color: filterDropdownActiveTitle == item.name ? '#67a960' : '#54575A',
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // --- Need to rewrite --- //
  // laoderRotate() {
  //   Animated.timing(this.state.loaderRotation, {
  //     toValue: 1,
  //     duration: 1000
  //   }).start(() => {
  //     this.laoderRotate();
  //   });
  // }

  // Flat list footer renderer
  renderListFooter = () => {
    // --- Need to rewrite --- //
    // const rotate = this.state.loaderRotation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ["0deg", "160deg"]
    // });
    return (
      <View style={loader}>
        <ActivityIndicator size="large" color="#C7CCD2" />
        {/* <Animated.View style={{ transform: [{ rotate: rotate }] }}>
          <LoadingIcon />
        </Animated.View> */}
      </View>
    );
  };

  render() {
    const { navigation, allRoutes, mainColor } = this.props;
    const { filterDropdownIsActive, filterDropdownActiveTitle, loaded } = this.state;

    return (
      <DropdownMenuLayout navigation={navigation} screenName="Поездки">
        <View style={[wrapper, whiteWrapper]}>
          {!loaded ? (
            <ActivityIndicator
              style={{ height: '100%', marginTop: 20 }}
              size="large"
              color={mainColor}
            />
          ) : (
            <Fragment>
              {this.renderFilter()}
              <FlatList
                style={{ height: '100%', position: 'relative', zIndex: 1, marginBottom: 100 }}
                data={allRoutes}
                keyExtractor={item => item.id.toString()}
                //ListHeaderComponent={() => this.renderListHeader(filterDropdownIsActive,filterDropdownActiveTitle)}
                //stickyHeaderIndices={[0]}
                ListFooterComponent={this.renderListFooter}
                renderItem={({ item }) => (
                  <SingleRouteCard
                    date={item.creation_date}
                    pointA={item.departure_station_address.ru}
                    pointAname={item.departure_station_name.ru}
                    pointB={item.return_station_address.ru}
                    pointBname={item.return_station_name.ru}
                    amount={item.amount}
                    duration={item.duration}
                    distance={item.covered_distance}
                    mainColor={mainColor}
                  />
                )}
                onMomentumScrollBegin={() => {
                  this.setState({ isScrolling: true });
                }}
                onEndReached={this._handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
              />
            </Fragment>
          )}
        </View>
      </DropdownMenuLayout>
    );
  }
}

export default connect(
  ({ allRoutes, themeChanger }) => ({
    isLoaded: allRoutes.allroutes_loaded,
    allRoutes: allRoutes.allroutes_data.rentals,
    mainColor: themeChanger.main_color,
  }),
  dispatch =>
    bindActionCreators(
      {
        getAllRoutes,
      },
      dispatch,
    ),
)(AllRoutesScreen);

const styles = StyleSheet.create({
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
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

const dropdownStyle = {
  fontSize: 14,
  fontFamily: fonts.OpenSansSemibold,
  color: '#54575A',
  textDecorationLine: 'underline',
  textDecorationStyle: 'dashed',
  textDecorationColor: '#54575A',
};
// --- THIS COMPONENT STYLES START --- //
const wrapper = {
  backgroundColor: '#ffffff',
  borderRadius: 15,
};

const title = {
  fontSize: 16,
  color: '#000000',
  marginTop: 20,
  marginLeft: 20,
  marginBottom: 10,
};
const filterWrap = {
  backgroundColor: '#ffffff',
  //top: 0,
  width: '100%',
  //display: 'flex',
  //flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingHorizontal: 25,
  paddingVertical: 15,
};
const filter = {
  // position: "relative",
  //display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  //zIndex: 20
};
const filterItems = {
  position: 'absolute',
  right: 20,
  top: 45,
  backgroundColor: '#fff',
  width: '75%',
  padding: 20,
  //display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  borderRadius: 4,
  // shadowOpacity: 0.1,
  // shadowRadius: 5,
  // shadowColor: '#000000',
  // shadowOffset: { height: 1, width: 0 },
  zIndex: 2111,
};

//const filterTitle = {
//fontSize: 12,
//color: '#1F2021',
//marginLeft: 10,
//lineHeight: 15,
//textDecorationStyle: 'dashed',
//textDecorationColor: '#1F2021'
//};

const loader = {
  width: '100%',
  paddingTop: 20,
  paddingBottom: 30,
  flexDirection: 'row',
  justifyContent: 'center',
};
// --- THIS COMPONENT STYLES END --- //
