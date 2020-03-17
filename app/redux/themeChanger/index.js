// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  GET_THEME_COLOR: 'GET_THEME_COLOR'
};

// --- GET THE MAIN COLOR OF APPLICATION THEME --- //
export const getColorAction = data => ({
  type: types.GET_THEME_COLOR,
  data
});

export const setTheme = data => async dispatch => {
  let color;
  AsyncStorage.setItem('primary_color', data);
  await AsyncStorage.getItem('primary_color').then(clr => (color = clr));
  dispatch(getColorAction(color));
};

// --- REDUCER START --- //
export const initialState = {
  main_color: '',
  color_set: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_THEME_COLOR:
      return {
        ...state,
        main_color: action.data,
        color_set: true
      };
    default:
      return state;
  }
};
