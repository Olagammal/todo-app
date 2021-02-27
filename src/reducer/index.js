import { combineReducers } from "redux";
import TodoReducer from "./TodoReducer";
import InputReducer from "./InputReducer";

const rootReducer = combineReducers({ TodoReducer, InputReducer });
export default rootReducer;
