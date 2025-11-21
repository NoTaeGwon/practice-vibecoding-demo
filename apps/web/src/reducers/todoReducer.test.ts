import { Todo } from "../types/todo";
import { todoReducer, initialTodoState, TodoState } from "./todoReducer";

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

describe("todoReducer", () => {
  it("SET_TODOS: 초기 로딩 시 todos를 설정한다", () => {
    const todos = [createTodo({ id: "1" }), createTodo({ id: "2" })];
    const next = todoReducer(initialTodoState, {
      type: "SET_TODOS",
      payload: { todos },
    });
    expect(next.todos).toHaveLength(2);
  });

  it("ADD_TODO: 새 TODO를 추가한다", () => {
    const todo = createTodo({ id: "1" });
    const next = todoReducer(initialTodoState, {
      type: "ADD_TODO",
      payload: { todo },
    });
    expect(next.todos).toHaveLength(1);
    expect(next.todos[0].id).toBe("1");
  });

  it("UPDATE_TODO: 기존 TODO를 수정한다", () => {
    const initial: TodoState = {
      ...initialTodoState,
      todos: [createTodo({ id: "1", title: "old" })],
    };
    const updated = createTodo({ id: "1", title: "new" });
    const next = todoReducer(initial, {
      type: "UPDATE_TODO",
      payload: { todo: updated },
    });
    expect(next.todos[0].title).toBe("new");
  });

  it("DELETE_TODO: TODO를 삭제한다", () => {
    const initial: TodoState = {
      ...initialTodoState,
      todos: [createTodo({ id: "1" })],
    };
    const next = todoReducer(initial, {
      type: "DELETE_TODO",
      payload: { id: "1" },
    });
    expect(next.todos).toHaveLength(0);
  });

  it("SET_FILTER: 필터를 변경한다", () => {
    const next = todoReducer(initialTodoState, {
      type: "SET_FILTER",
      payload: { filter: "completed" },
    });
    expect(next.filter).toBe("completed");
  });

  it("SET_SEARCH_QUERY: 검색어를 변경한다", () => {
    const next = todoReducer(initialTodoState, {
      type: "SET_SEARCH_QUERY",
      payload: { searchQuery: "테스트" },
    });
    expect(next.searchQuery).toBe("테스트");
  });

  it("SET_PRIORITY_FILTER: 중요도 필터를 변경한다", () => {
    const next = todoReducer(initialTodoState, {
      type: "SET_PRIORITY_FILTER",
      payload: { priority: "high" },
    });
    expect(next.priorityFilter).toBe("high");
  });
});


