import React, { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { Todo } from "../types/todo";
import { TodoProvider, useTodoState, useTodoDispatch } from "./TodoContext";

function wrapper({ children }: { children: ReactNode }) {
  return <TodoProvider>{children}</TodoProvider>;
}

function createTodo(overrides: Partial<Todo> = {}): Todo {
  const now = new Date().toISOString();
  return {
    id: "1",
    title: "테스트 TODO",
    completed: false,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

describe("TodoContext", () => {
  it("초기 상태를 제공한다", () => {
    const { result } = renderHook(() => useTodoState(), { wrapper });
    expect(result.current.todos).toEqual([]);
    expect(result.current.filter).toBe("all");
    expect(result.current.searchQuery).toBe("");
  });

  it("dispatch를 통해 상태를 업데이트할 수 있다", () => {
    const { result } = renderHook(
      () => {
        const state = useTodoState();
        const dispatch = useTodoDispatch();
        return { state, dispatch };
      },
      { wrapper }
    );

    act(() => {
      result.current.dispatch({
        type: "ADD_TODO",
        payload: { todo: createTodo({ id: "1", title: "새 할 일" }) },
      });
    });

    expect(result.current.state.todos).toHaveLength(1);
    expect(result.current.state.todos[0].title).toBe("새 할 일");
  });
});


