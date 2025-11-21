import { Todo } from "../types/todo";
import { localTodoApi, STORAGE_KEY } from "./todoApi";

function getStoredTodos(): Todo[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Todo[]) : [];
}

describe("localTodoApi (TodoApiClient mock)", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("초기에는 빈 TODO 목록을 반환한다", async () => {
    const todos = await localTodoApi.fetchTodos();
    expect(todos).toEqual([]);
  });

  it("createTodo로 TODO를 추가하고, fetchTodos로 조회할 수 있다", async () => {
    const created = await localTodoApi.createTodo("새 할 일", "medium");

    expect(created.id).toBeTruthy();
    expect(created.title).toBe("새 할 일");
    expect(created.completed).toBe(false);
    expect(created.priority).toBe("medium");

    const todos = await localTodoApi.fetchTodos();
    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe("새 할 일");
    expect(todos[0].priority).toBe("medium");
  });

  it("updateTodo로 TODO를 수정하면 저장소에도 반영된다", async () => {
    const created = await localTodoApi.createTodo("원래 제목", "low");
    const updated: Todo = { ...created, title: "수정된 제목", priority: "high" };

    const result = await localTodoApi.updateTodo(updated);
    expect(result.title).toBe("수정된 제목");
    expect(result.priority).toBe("high");

    const todos = getStoredTodos();
    expect(todos[0].title).toBe("수정된 제목");
    expect(todos[0].priority).toBe("high");
  });

  it("deleteTodo로 TODO를 삭제하면 목록에서 사라진다", async () => {
    const created = await localTodoApi.createTodo("삭제될 할 일", "medium");
    await localTodoApi.deleteTodo(created.id);

    const todos = await localTodoApi.fetchTodos();
    expect(todos).toHaveLength(0);
  });
});
