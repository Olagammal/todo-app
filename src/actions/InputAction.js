import { INPUTCHANGE } from "../actionTypes";

export const inputChange = (todoValue) => {
  return {
    type: INPUTCHANGE,
    payload: todoValue,
  };
};
