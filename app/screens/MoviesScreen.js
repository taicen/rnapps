import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';
import { movies } from '../constants';

export default class MoviesScreen extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          {movies.map((movie, index) => <Text>{movie.title}</Text>)}
        </ScrollView>
      </View>
    );
  }
}