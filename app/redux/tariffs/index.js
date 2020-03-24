import Config from 'react-native-config';
import { formBuilder } from '../../helpers';

export const types = {
  GET_TARIFFS_REQUEST: 'GET_TARIFFS_REQUEST',
  GET_TARIFFS_CONFIRM: 'GET_TARIFFS_CONFIRM',
  GET_TARIFFS_FAILURE: 'GET_TARIFFS_FAILURE',
  GET_TARIFFS_CARDINFO_REQUEST: 'GET_TARIFFS_CARDINFO_REQUEST',
  GET_TARIFFS_CARDINFO_CONFIRM: 'GET_TARIFFS_CARDINFO_CONFIRM',
  GET_TARIFFS_CARDINFO_FAILURE: 'GET_TARIFFS_CARDINFO_FAILURE',
};

// --- GET TARRIFS INFO START --- //
export const getTariffsRequest = () => ({
  type: types.GET_TARIFFS_REQUEST,
});
export const getTariffsConfirm = data => ({
  type: types.GET_TARIFFS_CONFIRM,
  data,
});
export const getTariffsFailure = error => ({
  type: types.GET_TARIFFS_FAILURE,
  data: error,
});

export const getTariffs = data => dispatch => {
  dispatch(getTariffsRequest());
  fetch(`${Config.API_URL}/member/TarifList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formBuilder(),
  })
    .then(res => res.json())
    .then(res => {
      //console.log("Tariffs data", res);
      dispatch(getTariffsConfirm(res));
    })
    .catch(e => {
      console.log('Tariffs error', e.response);
    });
};
// --- GET TARIFFS INFO END --- //

// --- GET USER CARDS INFO START --- //
export const getCardsInfoRequest = () => ({
  type: types.GET_TARIFFS_CARDINFO_REQUEST,
});
export const getCardsInfoConfirm = data => ({
  type: types.GET_TARIFFS_CARDINFO_CONFIRM,
  data,
});
export const getCardsInfoFailure = error => ({
  type: types.GET_TARIFFS_CARDINFO_FAILURE,
  data: error,
});

export const getCardsInfo = data => dispatch => {
  dispatch(getCardsInfoRequest());
  fetch(`${Config.API_URL}/member/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formBuilder({ ...data }),
  })
    .then(res => res.json())
    .then(res => {
      //console.log("🐞: tariffs cards -> res", res);
      dispatch(getCardsInfoConfirm(res));
    })
    .catch(e => {
      console.log('🐞: e', e.response);
    });
};
// --- GET USER CARDS INFO END --- //

// --- REDUCER START --- //
export const initialState = {
  tariffs_loaded: false,
  tariffs_data: [],
  cards_loaded: false,
  cards_data: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TARIFFS_REQUEST:
      return {
        ...state,
        tariffs_loaded: false,
      };
    case types.GET_TARIFFS_CONFIRM:
      return {
        ...state,
        tariffs_loaded: true,
        tariffs_data: action.data,
      };
    case types.GET_TARIFFS_CARDINFO_REQUEST:
      return {
        ...state,
        cards_loaded: false,
      };
    case types.GET_TARIFFS_CARDINFO_CONFIRM:
      return {
        ...state,
        cards_loaded: true,
        cards_data: action.data,
      };
    default:
      return state;
  }
};
