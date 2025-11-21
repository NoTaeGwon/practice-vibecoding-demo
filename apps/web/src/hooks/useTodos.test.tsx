import React, { ReactNode } from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
import { Todo } from "../types/todo";
import { TodoProvider } from "../context/TodoContext";
import { useTodos } from "./useTodos";
import { localTodoApi } from "../services/todoApi";

jest.mock("../services/todoApi");

const mockedApi = localTodoApi as jest.Mocked<typeof localTodoApi>;

function wrapper({ children }: { children: ReactNode }) {
  return <TodoProvider>{children}</TodoProvider>;
}

describe("useTodos (Context + API 통합)", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("loadTodos 호출 시 API에서 받아온 목록을 상태에 반영한다", async () => {
    const todos: Todo[] = [
      {
        id: "1",
        title: "불러온 TODO",
        completed: false,
        priority: "medium",
        createdAt: "now",
        updatedAt: "now",
      },
    ];
    mockedApi.fetchTodos.mockResolvedValueOnce(todos);

    const { result } = renderHook(() => useTodos(), { wrapper });

    await act(async () => {
      await result.current.loadTodos();
    });

    await waitFor(() => {
      expect(result.current.state.todos).toHaveLength(1);
      expect(result.current.state.todos[0].title).toBe("불러온 TODO");
    });
    expect(mockedApi.fetchTodos).toHaveBeenCalledTimes(1);
  });

  it("addTodo 호출 시 API와 상태가 함께 업데이트된다", async () => {
    const created: Todo = {
      id: "1",
      title: "새 할 일",
      completed: false,
      priority: "high",
      createdAt: "now",
      updatedAt: "now",
    };
    mockedApi.createTodo.mockResolvedValueOnce(created);

    const { result } = renderHook(() => useTodos(), { wrapper });

    await act(async () => {
      await result.current.addTodo("새 할 일", "high");
    });

    expect(mockedApi.createTodo).toHaveBeenCalledWith("새 할 일", "high");
    expect(result.current.state.todos).toHaveLength(1);
    expect(result.current.state.todos[0].title).toBe("새 할 일");
  });
});

