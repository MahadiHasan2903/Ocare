import { combineReducers } from "redux";
import userReducer from "./userReducer";
import patientReducer from "./patientReducer";

export const reducer = combineReducers({
  user: userReducer,
  patient: patientReducer,
});
