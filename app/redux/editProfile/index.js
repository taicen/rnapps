import Config from 'react-native-config';
import { formBuilder } from '../../helpers';
// import { AsyncStorage } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export const types = {
  EDIT_PROFILE_REQUEST: 'EDIT_PROFILE_REQUEST',
  EDIT_PROFILE_CONFIRM: 'EDIT_PROFILE_CONFIRM',
  EDIT_PROFILE_FAILURE: 'EDIT_PROFILE_FAILURE',
  EDIT_PASSWORD_REQUEST: 'EDIT_PASSWORD_REQUEST',
  EDIT_PASSWORD_CONFIRM: 'EDIT_PASSWORD_CONFIRM',
  EDIT_PASSWORD_FAILURE: 'EDIT_PASSWORD_FAILURE',
};

export const editProfileRequest = () => ({
  type: types.EDIT_PROFILE_REQUEST,
});

export const editProfileConfirm = data => ({
  type: types.EDIT_PROFILE_CONFIRM,
  data,
});

export const editProfileFailure = error => ({
  type: types.EDIT_PROFILE_FAILURE,
  data: error,
});

export const editProfile = data => async dispatch => {
  // console.log(values);
  // return;
  const token = await AsyncStorage.getItem('user_token');
  dispatch(editProfileRequest());
  return fetch(`${Config.API_URL}/member/dataEdit`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ ...data, token }),
  })
    .then(res => res.json())
    .then(res => {
      // console.log("EditProfileAction", res);
      dispatch(editProfileConfirm(res));
      return res;
    })
    .catch(e => {
      dispatch(editProfileFailure(e.response));
    });
};

// EDIT_PASSWORD_REQUEST: 'EDIT_PASSWORD_REQUEST',
// EDIT_PASSWORD_CONFIRM: 'EDIT_PASSWORD_CONFIRM',
// EDIT_PASSWORD_FAILURE: 'EDIT_PASSWORD_FAILURE'

export const editPasswordRequest = () => ({
  type: types.EDIT_PASSWORD_REQUEST,
});

export const editPasswordConfirm = data => ({
  type: types.EDIT_PASSWORD_CONFIRM,
  data,
});

export const editPasswordFailure = error => ({
  type: types.EDIT_PASSWORD_FAILURE,
  data: error,
});

export const editPassword = data => async dispatch => {
  const token = await AsyncStorage.getItem('user_token');
  // console.log(token);

  dispatch(editPasswordRequest());
  fetch(`${Config.API_URL}/member/changePassword`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ ...data, token }),
  })
    .then(res => res.json())
    .then(res => {
      //console.log('Password-change', res);
      dispatch(editPasswordConfirm(res));
    })
    .catch(e => {
      console.log('Password-change-error', e.response);
    });
};

const initialState = {
  photo: undefined,
  iin: undefined,
  name: undefined,
  lastName: undefined,
  email: undefined,
  phone: undefined,
  docs: undefined,
  language: undefined,
  city: undefined,
  about: undefined,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EDIT_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.EDIT_PROFILE_CONFIRM:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
