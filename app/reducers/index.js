import { combineReducers } from "redux";

import authReducer from "./authReducer";
import langaugeReducer from "./languageReducer";

export default combineReducers({
  auth: authReducer,
  language: langaugeReducer,
});
