import Config from "react-native-config";
import { formBuilder } from "../../helpers";

export const types = {
  SEND_CODE_REQUEST: "SEND_CODE_REQUEST",
  SEND_CODE_CONFIRM: "SEND_CODE_CONFIRM",
  SEND_CODE_FAILURE: "SEND_CODE_FAILURE",
  SAVE_CODE_REQUEST: "SAVE_CODE_REQUEST",
  SAVE_CODE_CONFIRM: "SAVE_CODE_CONFIRM",
  SAVE_CODE_FAILURE: "SAVE_CODE_FAILURE",
  NEW_PASS_REQUEST: "NEW_PASS_REQUEST",
  NEW_PASS_CONFIRM: "NEW_PASS_CONFIRM",
  NEW_PASS_FAILURE: "NEW_PASS_FAILURE"
};

export const sendPassCodeRequest = () => ({
  type: types.SEND_CODE_REQUEST
});

export const sendPassCodeConfirm = data => ({
  type: types.SEND_CODE_CONFIRM,
  data
});

export const sendPassCodeFailure = error => ({
  type: types.SEND_CODE_FAILURE,
  data: error
});

export const sendPassCode = data => dispatch => {
  dispatch(sendPassCodeRequest());
  fetch(`${Config.API_URL}/member/smssend`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("smsCodeSend", res);
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const saveCodeRequest = () => ({
  type: types.SAVE_CODE_REQUEST
});

export const saveCodeConfirm = data => ({
  type: types.SAVE_CODE_CONFIRM,
  data
});

export const saveCodeFailure = error => ({
  type: types.SAVE_CODE_FAILURE,
  data: error
});

export const saveCode = data => dispatch => {
  dispatch(saveCodeRequest());
  fetch(`${Config.API_URL}/member/confirmationCodeSave`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("CodeSaved", res);
    })
    .catch(e => {
      console.log(e.response);
    });
};

// pass
export const newPassRequest = () => ({
  type: types.NEW_PASS_REQUEST
});

export const newPassConfirm = data => ({
  type: types.NEW_PASS_CONFIRM,
  data
});

export const newPassFailure = error => ({
  type: types.NEW_PASS_FAILURE,
  data: error
});

export const newPass = data => dispatch => {
  dispatch(saveCodeRequest());
  fetch(`${Config.API_URL}/member/ichangePassword`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("PassChanged", res);
      dispatch(newPassConfirm());
    })
    .catch(e => {
      console.log(e.response);
    });
};

export const initialState = {
  code_is_saved: false,
  sms_is_send: false,
  pass_change_in: false,
  pass_changed: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CODE_CONFIRM:
      return {
        ...state,
        code_is_saved: true
      };
    case types.SEND_CODE_CONFIRM:
      return {
        ...state,
        sms_is_send: true
      };
    case types.NEW_PASS_REQUEST:
      return {
        ...state,
        pass_change_in: true,
        pass_changed: false
      };
    case types.NEW_PASS_CONFIRM:
      return {
        ...state,
        pass_change_in: false,
        pass_changed: true
      };
    default:
      return state;
  }
};
