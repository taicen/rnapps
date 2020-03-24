import Config from 'react-native-config';
import { formBuilder } from '../../helpers';
import { loginOut } from '../auth';

export const types = {
  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_CONFIRM: 'LOGOUT_CONFIRM',
  LOGOUT_FAILURE: 'LOGOUT_FAILURE',
};

// --- LOGOUT FROM THE SYSTEM START --- //
export const logoutRequest = () => ({
  type: types.LOGOUT_REQUEST,
});
export const logoutConfirm = data => ({
  type: types.LOGOUT_CONFIRM,
  data,
});
export const logoutFailure = error => ({
  type: types.LOGOUT_FAILURE,
  data: error,
});
export const logoutReset = data => dispatch => {
  dispatch(logoutRequest());
};
export const logout = data => dispatch => {
  dispatch(loginOut());
  fetch(`${Config.API_URL}/member/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formBuilder({ ...data }),
  })
    .then(res => res.json())
    .then(res => {
      //console.log("logout res", res);
      dispatch(logoutConfirm(res));
    })
    .catch(e => {
      console.log('logout failure', e.response);
    });
};
// --- LOGOUT FROM THE SYSTEM END --- //

// --- REDUCER START --- //
export const initialState = {
  logout_success: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGOUT_CONFIRM:
      return {
        ...state,
        logout_success: true,
      };
    case types.LOGOUT_REQUEST:
      return {
        ...state,
        logout_success: false,
      };

    default:
      return state;
  }
};
