import { INPUTCHANGE } from "../actionTypes";

const initialState = {
  todo: "",
};

const InputReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUTCHANGE:
      return { ...state, todo: action.payload };
    default:
      return state;
  }
};

export default InputReducer;
