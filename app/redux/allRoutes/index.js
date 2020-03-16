import Config from "react-native-config";
import { formBuilder } from "../../helpers";

export const types = {
  GET_ALLROUTES_REQUEST: "GET_ALLROUTES_REQUEST",
  GET_ALLROUTES_CONFIRM: "GET_ALLROUTES_CONFIRM",
  GET_ALLROUTES_FAILURE: "GET_ALLROUTES_FAILURE"
};

// --- GET HISTORY OF ALL ROUTES START --- //
export const getAllRoutesRequest = () => ({
  type: types.GET_ALLROUTES_REQUEST
});
export const getAllRoutesConfirm = data => ({
  type: types.GET_ALLROUTES_CONFIRM,
  data
});
export const getAllRoutesFailure = error => ({
  type: types.GET_ALLROUTES_FAILURE,
  data: error
});

export const getAllRoutes = data => dispatch => {
  dispatch(getAllRoutesRequest());
  fetch(`${Config.API_URL}/member/irentals`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("All Routes data: ", res);
      dispatch(getAllRoutesConfirm(res));
    })
    .catch(e => {
      console.log("All Routes error", e.response);
    });
};
// --- GET HISTORY OF ALL ROUTES END --- //

// --- REDUCER START --- //
export const initialState = {
  allroutes_loaded: false,
  allroutes_data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALLROUTES_REQUEST:
      return {
        ...state,
        allroutes_loaded: false
      };
    case types.GET_ALLROUTES_CONFIRM:
      return {
        ...state,
        allroutes_loaded: true,
        allroutes_data: action.data
      };
    default:
      return state;
  }
};
