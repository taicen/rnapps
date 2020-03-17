import Config from 'react-native-config';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { formBuilder } from '../../helpers';

export const types = {
  PROFILE_DATA_REQUEST: 'PROFILE_DATA_REQUEST',
  PROFILE_DATA_CONFIRM: 'PROFILE_DATA_CONFIRM',
  PROFILE_DATA_FAILURE: 'PROFILE_DATA_FAILURE'
};

export const profileDataRequest = () => ({
  type: types.PROFILE_DATA_REQUEST
});

export const profileDataConfirm = data => ({
  type: types.PROFILE_DATA_CONFIRM,
  data
});

export const profileDataFailure = error => ({
  type: types.PROFILE_DATA_FAILURE,
  data: error
});

export const profileData = () => async dispatch => {
  const token = await AsyncStorage.getItem('user_token');
  console.log('🐞: token', token);
  const data = {
    token
  };
  dispatch(profileDataRequest());
  return fetch(`${Config.API_URL}/member/data`, {
    method: 'POST',
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log('profileData', res);
      dispatch(profileDataConfirm(res));
      return res;
    })
    .catch(e => {
      dispatch(profileDataFailure(e.response));
    });
};

export const initialState = {
  profile_data: null,
  profile_photo: null,
  profile_token: null,
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.PROFILE_DATA_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.PROFILE_DATA_CONFIRM:
      return {
        ...state,
        loading: false,
        profile_data: action.data.profile,
        profile_photo: action.data.photo,
        profile_token: action.data.token
      };
    default:
      return state;
  }
};
