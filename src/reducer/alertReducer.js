import { DISPLAYALERT } from "../actionTypes";

const initialState = {
  alertType: "",
  alertText: "",
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAYALERT:
      return {
        ...state,
        alertType: action.payload.type,
        alertText: action.payload.text,
      };
    default:
      return state;
  }
};

export default alertReducer;
