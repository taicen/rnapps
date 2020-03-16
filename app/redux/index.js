import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import modal from "./modal";
import stations from "./stations";
import support from "./support";
import location from "./location";
import editProfile from "./editProfile";
import profile from "./profile";
import forgetPassword from "./forgetPassword";
import common from "./common";
import notifications from "./notifications";
import payments from "./payments";
import favorite from "./favorite";
import allRoutes from "./allRoutes";
import tariffs from "./tariffs";
import themeChanger from "./themeChanger";
import logout from "./logout";

const reducers = combineReducers({
  common,
  auth,
  editProfile,
  support,
  modal,
  stations,
  location,
  profile,
  forgetPassword,
  notifications,
  payments,
  form: formReducer,
  favorite,
  allRoutes,
  tariffs,
  themeChanger,
  logout
});

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
