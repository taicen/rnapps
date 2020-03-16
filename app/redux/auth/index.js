import Config from 'react-native-config';
import { stopSubmit } from 'redux-form';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { profileData } from '../profile';
import { formBuilder } from '../../helpers';
import { checkPhoneRegisterRequest, sendSmsCodeRequest, registerService } from './api';

export const types = {
  CHECK_PHONE_REQUEST: 'CHECK_PHONE_REQUEST',
  CHECK_PHONE_SUCCESS: 'CHECK_PHONE_SUCCESS',
  CHECK_PHONE_FAILURE: 'CHECK_PHONE_FAILURE',
  SEND_SMS_REQUEST: 'SEND_SMS_REQUEST',
  SEND_SMS_SUCCESS: 'SEND_SMS_SUCCESS',
  SEND_SMS_FAILURE: 'SEND_SMS_FAILURE',
  CONFIRM_CODE_REQUEST: 'CONFIRM_CODE_REQUEST',
  CONFIRM_CODE_SUCCESS: 'CONFIRM_CODE_SUCCESS',
  CONFIRM_CODE_FAILURE: 'CONFIRM_CODE_FAILURE',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGIN_OUT: 'LOGIN_OUT',
  CONFIRM_EMAIL_SUCCESS: 'CONFIRM_EMAIL_SUCCESS'
};

export const confirmEmailSuccess = data => ({
  type: types.CONFIRM_EMAIL_SUCCESS,
  payload: data
});
export const sendSmsSuccess = data => ({
  type: types.SEND_SMS_SUCCESS,
  payload: data
});
export const sendSmsFailure = error => ({
  type: types.SEND_SMS_FAILURE,
  payload: error
});
export const confirmCodeSuccess = data => ({
  type: types.CONFIRM_CODE_SUCCESS,
  payload: data
});
export const confirmCodeFailure = error => ({
  type: types.CONFIRM_CODE_FAILURE,
  payload: error
});
export const registerSuccess = data => ({
  type: types.REGISTER_SUCCESS,
  payload: data
});
export const registerFailure = error => ({
  type: types.REGISTER_FAILURE,
  payload: error
});
export const loginRequest = data => ({
  type: types.LOGIN_REQUEST,
  payload: data
});
export const loginSuccess = data => ({
  type: types.LOGIN_SUCCESS,
  payload: data
});
export const loginFailure = error => ({
  type: types.LOGIN_FAILURE,
  payload: error
});
export const loginOut = data => ({
  type: types.LOGIN_OUT
});

export const checkPhoneAction = phone => dispatch => {
  dispatch({ type: types.CHECK_PHONE_REQUEST });

  return checkPhoneRegisterRequest(phone)
    .then(res => res.json())
    .then(data => {
      console.log('🐞: data', data);
      // phone
      //console.log('🐞: phone', phone);
      if (!data.success) {
        return dispatch(sendSmsCodeAction(phone));
      } else {
        // if (!data.success) return sendSmsCodeAction(phone);
        return { success: true, data };
        // return { success: false, data };
      }
    })
    .then(({ success: smsSended, data }) => {
      console.log('>>>>>>>>> smsSended', smsSended);
      if (!smsSended) {
        dispatch(sendSmsFailure(data));

        dispatch(
          stopSubmit('registration', {
            phone_number: data.message_ru
          })
        );
      }

      return smsSended;
    })
    .catch(e => sendSmsFailure(e));
};

export const sendSmsCodeAction = phone => dispatch => {
  console.log('🐞: phone - sendSmsCodeAction', phone);
  dispatch({ type: types.SEND_SMS_REQUEST });

  return sendSmsCodeRequest(phone)
    .then(res => res.json())
    .then(smsData => {
      console.log('🐞: smsData', smsData);
      if (smsData.success) {
        dispatch(sendSmsSuccess(smsData));
      }
      return smsData.success;
    });
};

// export const confirmCodeAction = code => async dispatch => {
//   dispatch({ type: types.CONFIRM_CODE_REQUEST, code });
// };

export const confirmCode = data => dispatch => {
  dispatch({ type: types.CONFIRM_CODE_REQUEST });
  return fetch(`${Config.API_URL_ROCKET}/v1/sms/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log('>>>> ConfirmCode', res);
      if (res.success) {
        dispatch(confirmCodeSuccess(res));
      }
      return res;
    })
    .catch(Promise.reject);
};

export const confirmEmail = async data => {
  //dispatch({ type: types.CONFIRM_CODE_REQUEST });
  return await fetch(`${Config.API_URL}/member/emailCheck`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log('>>>> ConfirmEmail', res);
      return res;
    })
    .catch(Promise.reject);
};

export const register = data => dispatch => {
  console.log('🐞: data -> registration', data);
  dispatch({ type: types.REGISTER_REQUEST });
  return registerService(data)
    .then(response => {
      console.log('🐞: response', response);
      if (response.success) {
        dispatch(registerSuccess(response));
      } else {
        dispatch(registerFailure(response));
      }
      return response;
    })
    .catch(error => dispatch(registerFailure(error)));
};

export const login = data => dispatch => {
  dispatch(loginRequest());
  fetch(`${Config.API_URL}/member/ilogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log('loginData', res);
      if (res.success) {
        dispatch(loginSuccess(res));
        dispatch(profileData());
      } else {
        dispatch(loginFailure(res));
      }
    })
    .catch(e => {
      console.log(e);
    });
};

export const initialState = {
  //! --> add after Edie
  send_sms_in_progress: false,
  send_sms_error: null,
  sms_sended: false,
  confirm_code_in_progress: false,
  confirm_code_error: null,
  code_confirmed: false,
  register_in_progress: false,
  register_done: false,
  register_error: null,
  logining_in: false,
  logining_data: null,
  logining_success: false,
  logining_error: false,
  logining_error_message: null,
  reg_token: null,
  token: '',
  email_confirm: false,
  // moderation: true,
  // approved: false,
  //! <->
  loading: false,
  smsData: {
    code: null,
    phone_number: null,
    success: false
  },
  error: null
};

export default (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    case types.SEND_SMS_REQUEST:
      //! --> add after Edie

      return {
        ...state,
        send_sms_in_progress: true
      };
    case types.SEND_SMS_SUCCESS:
      return {
        ...state,
        send_sms_in_progress: false,
        sms_sended: action.data.success
      };
    case types.SEND_SMS_FAILURE:
      return {
        ...state,
        send_sms_in_progress: false,
        send_sms_error: action.data
      };
    case types.CONFIRM_EMAIL_SUCCESS:
      return {
        ...state,
        email_confirm: payload.success
      };
    case types.CONFIRM_CODE_REQUEST:
      return {
        ...state,
        confirm_code_in_progress: true
      };
    case types.CONFIRM_CODE_SUCCESS:
      return {
        ...state,
        confirm_code_in_progress: false,
        code_confirmed: payload.success
      };
    case types.CONFIRM_CODE_FAILURE:
      return {
        ...state,
        confirm_code_in_progress: false,
        confirm_code_error: action.data
      };
    //! <->
    case types.CHECK_PHONE_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        ...state,
        register_in_progress: true,
        register_done: false
      };
    case types.REGISTER_SUCCESS:
      AsyncStorage.setItem('user_token', payload.token);
      return { ...state, loading: true };
    // case types.SEND_SMS_SUCCESS:
    //   return { ...state, loading: false, smsData: payload, error: null };

    // case types.SEND_SMS_FAILURE:
    case types.REGISTER_FAILURE:
      return { ...state, loading: false, error: payload };

    case types.LOGIN_REQUEST:
      return {
        ...state,
        logining_in: true,
        logining_error: false
      };
    case types.LOGIN_SUCCESS:
      AsyncStorage.setItem('user_token', payload.token);
      return {
        ...state,
        logining_in: false,
        logining_data: payload.profile,
        logining_success: payload.success,
        token: payload.token
        // moderation: payload.moderation || true
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        logining_in: false,
        logining_error: true,
        logining_error_message: payload.message_ru,
        logining_success: false
      };
    case types.LOGIN_OUT:
      return {
        ...state,
        logining_in: false,
        logining_success: false
      };

    default:
      return state;
  }
};
