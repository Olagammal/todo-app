import { ADDTODO, DELETETODO, TOGGLECOMPLETION } from "../actionTypes";

export const addTodo = (todoInput) => {
  return {
    type: ADDTODO,
    payload: todoInput,
  };
};
export const toggleCompletion = (todoId) => {
  return {
    type: TOGGLECOMPLETION,
    payload: todoId,
  };
};
export const deleteTodo = (todoId) => {
  return {
    type: DELETETODO,
    payload: todoId,
  };
};
