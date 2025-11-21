import { Todo, TodoPriorityFilter } from "../types/todo";

export type TodoFilter = "all" | "active" | "completed";

export interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  priorityFilter: TodoPriorityFilter;
  searchQuery: string;
}

export type TodoAction =
  | { type: "SET_TODOS"; payload: { todos: Todo[] } }
  | { type: "ADD_TODO"; payload: { todo: Todo } }
  | { type: "UPDATE_TODO"; payload: { todo: Todo } }
  | { type: "DELETE_TODO"; payload: { id: string } }
  | { type: "SET_FILTER"; payload: { filter: TodoFilter } }
  | {
      type: "SET_PRIORITY_FILTER";
      payload: { priority: TodoPriorityFilter };
    }
  | { type: "SET_SEARCH_QUERY"; payload: { searchQuery: string } };

export const initialTodoState: TodoState = {
  todos: [],
  filter: "all",
  priorityFilter: "all",
  searchQuery: "",
};

export function todoReducer(
  state: TodoState = initialTodoState,
  action: TodoAction
): TodoState {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload.todo],
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.todo.id ? action.payload.todo : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload.filter,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
      };
    case "SET_PRIORITY_FILTER":
      return {
        ...state,
        priorityFilter: action.payload.priority,
      };
    default:
      return state;
  }
}


