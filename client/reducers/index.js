import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import account from "./account";
import messages from "./messages";
import {intlReducer as intl} from "react-intl-redux";


export default combineReducers({
  routing,
  account,
  messages,
  intl
});
