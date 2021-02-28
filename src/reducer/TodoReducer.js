import { ADDTODO, TOGGLECOMPLETION, DELETETODO } from "../actionTypes";
import Todo from "../components/Todo";

const initialState = {
  todos: [],
};

const TodoReducer = (state = initialState, action) => {
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
      let deletionIndex = 0;
      Todos.map((singleTodo, index) =>
        singleTodo.id === action.payload ? (deletionIndex = index) : ""
      );
      Todos.splice(deletionIndex, 1);
      return { ...state, todos: [...Todos] };
    default:
      return state;
  }
};

export default TodoReducer;
