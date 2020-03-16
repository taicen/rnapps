import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Platform
} from 'react-native';
import { SearchGeoIcon, SearchLoupeIcon, SearchCloseIcon } from '../../svg';
import { Results } from './partials/Results';
import { shadowBoxStyles } from '../../../styles';
import { MSContextConsumer } from '../../../context/MainScreenContext';

class SearchBlock extends Component {
  // static contextType = showListContext;
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.state = {
      dataToSearch: '',
      isFocused: false
    };
  }

  handleViewWidth = () => {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 500
    }).start(() => {
      this.setState({ isFocused: true });
    });
  };

  handleResultClose = () => {
    this.animatedValue.setValue(1);
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 500
    }).start(() => {
      this.setState({ dataToSearch: '', isFocused: false });
    });
  };

  render() {
    const { data, navigation, token, color, getFocus } = this.props;
    const result =
      this.state.dataToSearch !== null
        ? data &&
          data.filter(
            item =>
              item.address.ru.toUpperCase().indexOf(this.state.dataToSearch.toUpperCase()) > -1 ||
              item.name.ru.toUpperCase().indexOf(this.state.dataToSearch.toUpperCase()) > -1
          )
        : null;

    return (
      /*
        <== MSContextConsumer (Main Screen Context Consumer) - consumer, which takes provided data from Main Screen context ==>
      */
      <MSContextConsumer>
        {({ showListHandler, showListState, getResultList, showResultsHandler, showResults }) => (
          <Fragment>
            <Animated.View
              style={[
                styles.Wrapper,
                {
                  width: this.state.isFocused
                    ? this.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['20%', '100%']
                      })
                    : '20%'
                }
              ]}
            >
              <View style={styles.GeoIcon}>
                <SearchGeoIcon />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Улица"
                onTouchStart={() => {
                  showResultsHandler(true);
                  this.handleViewWidth();
                  getFocus('100%', '100%');
                }}
                onChangeText={value => {
                  this.setState({ dataToSearch: value });
                  getResultList(result);
                }}
                value={this.state.dataToSearch}
              />
              {this.state.isFocused ? (
                <TouchableOpacity
                  style={styles.CloseIcon}
                  onPress={() => {
                    this.handleResultClose();
                    showListHandler(false);
                    getResultList(null);
                    getFocus('auto', 'auto');
                  }}
                >
                  <SearchCloseIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.LoupeIcon}>
                  <SearchLoupeIcon />
                </TouchableOpacity>
              )}
            </Animated.View>
            {this.state.isFocused && !showListState && showResults && (
              <Results navigation={navigation} data={result} token={token} color={color} />
            )}
          </Fragment>
        )}
      </MSContextConsumer>
    );
  }
}

// --- STYLES --- //
const styles = StyleSheet.create({
  Wrapper: {
    position: 'relative',
    minWidth: 150,
    height: 44,
    elevation: 2,
    zIndex: 5
  },
  GeoIcon: {
    position: 'absolute',
    top: 14,
    left: 15,
    zIndex: 10,
    elevation: 3
  },
  input: {
    width: '100%',
    // height: "100%",
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 35,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 2,
    ...shadowBoxStyles
  },
  LoupeIcon: {
    position: 'absolute',
    top: 11.5,
    right: 15,
    elevation: 4
  },
  CloseIcon: {
    position: 'absolute',
    top: 6,
    right: 15,
    elevation: 5
  }
});

export default SearchBlock;
