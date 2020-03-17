import 'whatwg-fetch';
/**
 * TODO
 * add react-native-config
 */

import { stationListBuilder, stationBuilder } from '../../helpers';

import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  FETCH_STATIONS_REQUEST: 'FETCH_STATIONS_REQUEST',
  FETCH_STATIONS_SUCCESS: 'FETCH_STATIONS_SUCCESS',
  FETCH_STATIONS_FAILURE: 'FETCH_STATIONS_FAILURE',
  GET_STATION_REQUEST: 'GET_STATION_REQUEST',
  GET_STATION_SUCCESS: 'GET_STATION_SUCCESS',
  GET_STATION_FAILURE: 'GET_STATION_FAILURE',
  TOGGLE_ROAD_STATION: 'TOGGLE_ROAD_STATION'
};

export const fetchStationsRequest = () => ({
  type: types.FETCH_STATIONS_REQUEST
});

export const fetchStationsSuccess = data => ({
  type: types.FETCH_STATIONS_SUCCESS,
  data
});

export const fetchStationsFailure = error => ({
  type: types.FETCH_STATIONS_FAILURE,
  data: error
});

export const fetchStations = () => dispatch => {
  dispatch(fetchStationsRequest());
  fetch('https://velobike.kz/api/stations/get/')
    .then(res => res.json())
    .then(res => {
      console.log('fetch-stations', res);
      dispatch(fetchStationsSuccess(stationListBuilder(res)));
    })
    .catch(e => {
      console.log('e.response', e);
      dispatch(fetchStationsFailure(e));
    });
};

export const getStationRequest = () => ({
  type: types.GET_STATION_REQUEST
});

export const getStationSuccess = data => ({
  type: types.GET_STATION_SUCCESS,
  data
});

export const getStationFailure = error => ({
  type: types.GET_STATION_FAILURE,
  data: error
});

export const toggleRoadStation = data => ({
  type: types.TOGGLE_ROAD_STATION,
  data
});

export const fetchStatusRoad = data => dispatch => {
  dispatch(toggleRoadStation(data));
};

export const getStation = id => dispatch => {
  dispatch(getStationRequest());
  fetch(`https://velobike.kz/api/stations/get/${id}`)
    .then(res => res.json())
    .then(res => {
      console.log('get-stations', res);
      dispatch(getStationSuccess(stationBuilder(res[0])));
      // stationBuilder(res[0])
    })
    .catch(e => {
      console.log('e', e);
      dispatch(getStationFailure(e.response));
    });
};

export const initialState = {
  fetch_stations_in_progress: false,
  fetch_stations_error: null,
  station_list: null,
  get_station_in_progress: false,
  get_station_error: null,
  station: null,
  road_on: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STATIONS_REQUEST:
      return {
        ...state,
        fetch_stations_in_progress: true
      };
    case types.FETCH_STATIONS_SUCCESS:
      return {
        ...state,
        fetch_stations_in_progress: false,
        station_list: action.data
      };
    case types.FETCH_STATIONS_FAILURE:
      return {
        ...state,
        fetch_stations_in_progress: false,
        fetch_stations_error: action.data
      };
    case types.GET_STATION_REQUEST:
      return {
        ...state,
        get_station_in_progress: true
      };
    case types.GET_STATION_SUCCESS:
      return {
        ...state,
        get_station_in_progress: false,
        station: action.data
      };
    case types.GET_STATION_FAILURE:
      return {
        ...state,
        get_station_in_progress: false,
        get_station_error: action.data
      };
    case types.TOGGLE_ROAD_STATION:
      AsyncStorage.setItem('road_on', JSON.stringify(action.data.road_on));
      return {
        ...state,
        road_on: action.data.road_on
      };
    default:
      return state;
  }
};
