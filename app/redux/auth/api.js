import 'whatwg-fetch';
import Config from 'react-native-config';

import { formBuilder } from '../../helpers';

export const checkPhoneRegisterRequest = phone_number => {
  return fetch(`${Config.API_URL}/member/phoneCheck`, {
    method: 'POST',
    body: formBuilder({ phone_number }),
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const sendSmsCodeRequest = data => {
  // formBuilder(data)
  const dataToSend = {
    phone_number: data
  };
  console.log('🐞: formBuilder(data)', formBuilder(dataToSend));
  return fetch(`${Config.API_URL_ROCKET}/v1/sms/send`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    body: formBuilder(dataToSend)
  });
};

export const verifyCodeRequest = code => {
  return fetch(`${Config.API_URL_ROCKET}/v1/sms/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder({ code })
  });
};

export const registerService = data => {
  // formBuilder(data)
  console.log('🐞: formBuilder(data)', formBuilder(data));
  return fetch(`${Config.API_URL}/member/iregister`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formBuilder(data)
  }).then(res => res.json());
};
