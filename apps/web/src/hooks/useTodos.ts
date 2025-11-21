import { useCallback } from "react";
import { useTodoDispatch, useTodoState } from "../context/TodoContext";
import { localTodoApi } from "../services/todoApi";
import { Todo, TodoPriority, TodoPriorityFilter } from "../types/todo";
import { TodoFilter } from "../reducers/todoReducer";

export function useTodos() {
  const state = useTodoState();
  const dispatch = useTodoDispatch();

  const loadTodos = useCallback(async () => {
    const todos = await localTodoApi.fetchTodos();
    dispatch({ type: "SET_TODOS", payload: { todos } });
  }, [dispatch]);

  const addTodo = useCallback(
    async (title: string, priority: TodoPriority) => {
      const created = await localTodoApi.createTodo(title, priority);
      dispatch({ type: "ADD_TODO", payload: { todo: created } });
    },
    [dispatch]
  );

  const updateTodo = useCallback(
    async (todo: Todo) => {
      const updated = await localTodoApi.updateTodo(todo);
      dispatch({ type: "UPDATE_TODO", payload: { todo: updated } });
    },
    [dispatch]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      await localTodoApi.deleteTodo(id);
      dispatch({ type: "DELETE_TODO", payload: { id } });
    },
    [dispatch]
  );

  const setPriorityFilter = useCallback(
    (priority: TodoPriorityFilter) => {
      dispatch({ type: "SET_PRIORITY_FILTER", payload: { priority } });
    },
    [dispatch]
  );

  const setFilter = useCallback(
    (filter: TodoFilter) => {
      dispatch({ type: "SET_FILTER", payload: { filter } });
    },
    [dispatch]
  );

  const setSearchQuery = useCallback(
    (searchQuery: string) => {
      dispatch({ type: "SET_SEARCH_QUERY", payload: { searchQuery } });
    },
    [dispatch]
  );

  return {
    state,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    setPriorityFilter,
    setSearchQuery,
  };
}

