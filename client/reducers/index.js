import {combineReducers} from "redux";
import {routerReducer as routing} from "react-router-redux";
import intl from "./intl";
import account from "./account";
import messages from "./messages";


export default combineReducers({
  routing,
  account,
  messages,
  intl
});
