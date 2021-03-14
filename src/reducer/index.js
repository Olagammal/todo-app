import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import inputReducer from "./inputReducer";
import alertReducer from "./alertReducer"

const rootReducer = combineReducers({ todoReducer, inputReducer, alertReducer });
export default rootReducer;
