import 'whatwg-fetch';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

let token;
AsyncStorage.getItem('user_token').then(tkn => {
  token = tkn;
  // console.log(token);
});
export const types = {
  FETCH_PAYMENTS_REQUEST: 'FETCH_PAYMENTS_REQUEST',
  FETCH_PAYMENTS_SUCCESS: 'FETCH_PAYMENTS_SUCCESS',
  FETCH_PAYMENTS_FAILURE: 'FETCH_PAYMENTS_FAILURE',
  GET_PAYMENT_REQUEST: 'GET_PAYMENT_REQUEST',
  GET_PAYMENT_SUCCESS: 'GET_PAYMENT_SUCCESS',
  GET_PAYMENT_FAILURE: 'GET_PAYMENT_FAILURE',
  LOAD_MORE_PAYMENTS_REQUEST: 'LOAD_MORE_PAYMENTS_REQUEST'
};

export const fetchPaymentsRequest = () => ({
  type: types.FETCH_PAYMENTS_REQUEST
});

export const loadMorePaymentsRequest = () => ({
  type: types.LOAD_MORE_PAYMENTS_REQUEST
});

export const fetchPaymentsSuccess = data => ({
  type: types.FETCH_PAYMENTS_SUCCESS,
  data
});

export const fetchPaymentsFailure = error => ({
  type: types.FETCH_PAYMENTS_FAILURE,
  data: error
});

export const fetchPayments = page => dispatch => {
  if (page === 1) {
    dispatch(fetchPaymentsRequest());
  } else {
    dispatch(loadMorePaymentsRequest());
  }
  const formData = new FormData();
  formData.append('tokenApi', 'KCN8J#Jjip_#fjp#(UR)#RI8JFE2@9ufJ#)J)*(GCRMOIuhgUJJEIF#)(FH');
  formData.append('token', token);
  formData.append('limit', 15);
  formData.append('offset', page == 1 ? 0 : page * 15 - 15);
  fetch(`${Config.API_URL}/member/orders`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log('fetchPayments', res);
      dispatch(fetchPaymentsSuccess(res));
    })
    .catch(e => {
      console.log('e.response', e);
      dispatch(fetchPaymentsFailure(e));
    });
};

export const getPaymentRequest = () => ({
  type: types.GET_PAYMENT_REQUEST
});

export const getPaymentSuccess = data => ({
  type: types.GET_PAYMENT_SUCCESS,
  data
});

export const getPaymentFailure = error => ({
  type: types.GET_PAYMENT_FAILURE,
  data: error
});

export const getPayment = id => dispatch => {
  dispatch(getPaymentRequest());
  const formData = new FormData();
  formData.append('tokenApi', 'KCN8J#Jjip_#fjp#(UR)#RI8JFE2@9ufJ#)J)*(GCRMOIuhgUJJEIF#)(FH');
  formData.append('token', token);
  formData.append('id', id);
  fetch(`${Config.API_URL}/member/order`, {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(res => {
      console.log('getPayment', res);
      dispatch(getPaymentSuccess(res));
    })
    .catch(e => {
      console.log('e', e);
      dispatch(getPaymentFailure(e.response));
    });
};

export const initialState = {
  fetch_payments_in_progress: false,
  fetch_payments_error: null,
  payment_list: null,
  get_payment_in_progress: false,
  get_payment_error: null,
  payment: null,
  payment_count: 0,
  load_more_in_progress: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PAYMENTS_REQUEST:
      return {
        ...state,
        fetch_payments_in_progress: true
      };
    case types.LOAD_MORE_PAYMENTS_REQUEST:
      return {
        ...state,
        load_more_in_progress: true
      };
    case types.FETCH_PAYMENTS_SUCCESS:
      return {
        ...state,
        fetch_payments_in_progress: false,
        payment_list:
          state.payment_list != null
            ? [...state.payment_list, ...action.data.orders]
            : action.data.orders,
        payment_count: action.data.count,
        load_more_in_progress: false
      };
    case types.FETCH_PAYMENTS_FAILURE:
      return {
        ...state,
        fetch_payments_in_progress: false,
        fetch_payments_error: action.data,
        load_more_in_progress: false
      };
    case types.GET_PAYMENT_REQUEST:
      return {
        ...state,
        get_payment_in_progress: true
      };
    case types.GET_PAYMENT_SUCCESS:
      return {
        ...state,
        payment: action.data.order,
        get_payment_in_progress: false
      };
    case types.GET_PAYMENT_FAILURE:
      return {
        ...state,
        get_payment_in_progress: false,
        get_payment_error: action.data
      };
    default:
      return state;
  }
};
