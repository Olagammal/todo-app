import { ADDTODO, TOGGLECOMPLETION, DELETETODO } from "../actionTypes";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDTODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case TOGGLECOMPLETION:
      let placeHolderTodos = JSON.parse(JSON.stringify(state.todos));
      placeHolderTodos.map((singleTodo) =>
        singleTodo.id === action.payload
          ? singleTodo.status === "completed"
            ? (singleTodo.status = "pending")
            : (singleTodo.status = "completed")
          : ""
      );
      return { ...state, todos: [...placeHolderTodos] };
    case DELETETODO:
      let Todos = JSON.parse(JSON.stringify(state.todos));
      Todos.map((singleTodo, index) =>
        singleTodo.id === action.payload ? Todos.splice(index, 1) : ""
      );
      return { ...state, todos: [...Todos] };
    default:
      return state;
  }
};

export default todoReducer;
