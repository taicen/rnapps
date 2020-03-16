import Config from "react-native-config";
import { formBuilder } from "../../helpers";

export const types = {
  GET_FAVORITES_REQUEST: "GET_FAVORITES_REQUEST",
  GET_FAVORITES_CONFIRM: "GET_FAVORITES_CONFIRM",
  GET_FAVORITES_FAILURE: "GET_FAVORITES_FAILURE",
  DELETE_FAVORITES_REQUEST: "DELETE_FAVORITES_REQUEST",
  DELETE_FAVORITES_CONFIRM: "DELETE_FAVORITES_CONFIRM",
  DELETE_FAVORITES_FAILURE: "DELETE_FAVORITES_FAILURE",
  ADD_FAVORITES_REQUEST: "ADD_FAVORITES_REQUEST",
  ADD_FAVORITES_CONFIRM: "ADD_FAVORITES_CONFIRM",
  ADD_FAVORITES_FAILURE: "ADD_FAVORITES_FAILURE"
};

// --- GET LIST OF FAVORITE STATIONS START --- //
export const getFavoritesRequest = () => ({
  type: types.GET_FAVORITES_REQUEST
});
export const getFavoritesConfirm = data => ({
  type: types.GET_FAVORITES_CONFIRM,
  data
});
export const getFavoritesFailure = error => ({
  type: types.GET_FAVORITES_FAILURE,
  data: error
});

export const getFavorites = data => dispatch => {
  dispatch(getFavoritesRequest());
  fetch(`${Config.API_URL}/member/favoriteStations`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("getting favorites", res);
      dispatch(getFavoritesConfirm(res));
    })
    .catch(e => {
      console.log("getting favorites error", e.response);
    });
};
// --- GET LIST OF FAVORITES END --- //

// --- DELETE FROM FAVORITES START --- //
export const deleteFavoriteRequest = () => ({
  type: types.DELETE_FAVORITES_REQUEST
});
export const deleteFavoriteConfirm = data => ({
  type: types.DELETE_FAVORITES_CONFIRM,
  data
});
export const deleteFavoriteFailure = error => ({
  type: types.DELETE_FAVORITES_FAILURE,
  data: error
});

export const deleteFavorite = data => dispatch => {
  dispatch(deleteFavoriteRequest());
  fetch(`${Config.API_URL}/member/deletefavoriteStations`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("station deleted", res);
    })
    .catch(e => {
      console.log("error deleting station", e.response);
    });
};
// --- DELETE FROM FAVORITES END --- //

// --- ADD TO FAVORITES START --- //
export const addFavoritesRequest = () => ({
  type: types.ADD_FAVORITES_REQUEST
});
export const addFavoritesConfirm = data => ({
  type: types.ADD_FAVORITES_CONFIRM,
  data
});
export const addFavoritesFailure = error => ({
  type: types.ADD_FAVORITES_FAILURE,
  data: error
});

export const addFavorite = data => dispatch => {
  dispatch(addFavoritesRequest());
  fetch(`${Config.API_URL}/member/addfavoriteStations`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: formBuilder({ ...data })
  })
    .then(res => res.json())
    .then(res => {
      console.log("add to fav res", res);
      dispatch(addFavoritesConfirm(res));
    })
    .catch(e => {
      console.log("add to fav err", e.response);
    });
};
// --- ADD TO FAVORITES END --- //

// --- REDUCER START --- //
export const initialState = {
  favorite_stations_in_progress: false,
  favorite_stations_loaded: false,
  favorite_stations: [],
  favorite_added: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FAVORITES_REQUEST:
      return {
        ...state,
        favorite_stations_in_progress: true
      };
    case types.GET_FAVORITES_CONFIRM:
      return {
        ...state,
        favorite_stations_in_progress: false,
        favorite_stations_loaded: true,
        favorite_stations: action.data.stations
      };
    case types.ADD_FAVORITES_CONFIRM:
      return {
        ...state,
        favorite_added: true
      };
    default:
      return state;
  }
};
