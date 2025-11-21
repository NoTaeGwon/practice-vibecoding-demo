import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
} from "react";
import {
  todoReducer,
  initialTodoState,
  TodoState,
  TodoAction,
} from "../reducers/todoReducer";

type TodoDispatch = Dispatch<TodoAction>;

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<TodoDispatch | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState(): TodoState {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error("useTodoState는 TodoProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}

export function useTodoDispatch(): TodoDispatch {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useTodoDispatch는 TodoProvider 내부에서만 사용할 수 있습니다."
    );
  }
  return context;
}


