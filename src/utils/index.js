import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import rootReducer from "../reducer";

export const testStore = (initialState) => {
  const storeWithMiddleware = applyMiddleware(logger)(createStore);
  return storeWithMiddleware(rootReducer, initialState);
};
