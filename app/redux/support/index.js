import 'whatwg-fetch';
import Config from 'react-native-config';

import {
  showOverlay,
  hideOverlay,
  showInProgress,
  hideInProgress,
  showMessage,
  hideMessage,
} from '../common';
/**
 * TODO
 * add react-native-config
 */

export const types = {
  GET_CALLBACK_FORM_REQUEST: 'GET_CALLBACK_FORM_REQUEST',
  SEND_CALLBACK_REQUEST: 'SEND_CALLBACK_REQUEST',
  SEND_CALLBACK_SUCCESS: 'SEND_CALLBACK_SUCCESS',
  SEND_CALLBACK_FAILURE: 'SEND_CALLBACK_FAILURE',
};

export const getCallbackFormRequest = data => ({
  type: types.GET_CALLBACK_FORM_REQUEST,
  data,
});

export const sendCallbackRequest = () => ({
  type: types.SEND_CALLBACK_REQUEST,
});

export const sendCallbackSuccess = data => ({
  type: types.SEND_CALLBACK_SUCCESS,
  data,
});

export const sendCallbackFailure = error => ({
  type: types.SEND_CALLBACK_FAILURE,
  data: error,
});

export const getCallbackForm = () => dispatch => {
  const formData = new FormData();
  formData.append('getType', 1);
  formData.append('tokenApi', Config.TOKEN_API_ALM);
  fetch(`${Config.API_URL}/member/callBackForm/`, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      //console.log('>>>>>>>>>>> resForm', res);
      dispatch(getCallbackFormRequest(res));
    })
    .catch(e => {
      console.log('e.response', e);
      dispatch(sendCallbackFailure(e));
    });
};

export const sendCallback = (type, subtype, question) => dispatch => {
  //console.log(type, subtype, question);
  const formData = new FormData();
  formData.append('getType', 0);
  formData.append('type', type);
  formData.append('subtype', subtype);
  formData.append('question', question);
  formData.append('tokenApi', Config.TOKEN_API_ALM);
  dispatch(showInProgress());
  // dispatch(sendCallbackRequest())

  fetch(`${Config.API_URL}/member/callBackForm/`, {
    method: 'POST',
    body: formData,
  })
    .then(res => res.json())
    .then(res => {
      //console.log('res', res);
      dispatch(sendCallbackSuccess(res));
      dispatch(hideInProgress());
      if (res.success) {
        dispatch(showMessage('Ваше сообщение успешно отправлено'));
      }
    })
    .catch(e => {
      console.log('e.response', e);
      dispatch(sendCallbackFailure(e));
      // dispatch(hideInProgress())
    });
};

export const initialState = {
  callbackForm: {},
  send_callback_in_progress: false,
  send_callback_error: null,
  callback_sended: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CALLBACK_FORM_REQUEST:
      return {
        ...state,
        callbackForm: action.data,
      };
    case types.SEND_CALLBACK_REQUEST:
      return {
        ...state,
        send_callback_in_progress: true,
      };
    case types.SEND_CALLBACK_SUCCESS:
      return {
        ...state,
        send_callback_in_progress: false,
        callback_sended: action.data.success,
      };
    case types.SEND_CALLBACK_FAILURE:
      return {
        ...state,
        send_callback_in_progress: false,
        send_callback_error: action.data,
      };
    default:
      return state;
  }
};
