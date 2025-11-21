import { Todo, TodoPriority } from "../types/todo";

export const STORAGE_KEY = "todo-app.todos";

export interface TodoApiClient {
  fetchTodos(): Promise<Todo[]>;
  createTodo(title: string, priority: TodoPriority): Promise<Todo>;
  updateTodo(todo: Todo): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}

const DEFAULT_PRIORITY: TodoPriority = "medium";

function normalizeTodo(raw: Partial<Todo>): Todo {
  return {
    id: raw.id,
    title: raw.title,
    completed: Boolean(raw.completed),
    priority: (raw.priority as TodoPriority) ?? DEFAULT_PRIORITY,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

function readTodos(): Todo[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Partial<Todo>[];
    return parsed.map(normalizeTodo);
  } catch {
    return [];
  }
}

function writeTodos(todos: Todo[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function createTodoObject(title: string, priority: TodoPriority): Todo {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title,
    completed: false,
    priority,
    createdAt: now,
    updatedAt: now,
  };
}

export const localTodoApi: TodoApiClient = {
  async fetchTodos() {
    return readTodos();
  },

  async createTodo(title: string, priority: TodoPriority) {
    const todos = readTodos();
    const todo = createTodoObject(title, priority);
    todos.push(todo);
    writeTodos(todos);
    return todo;
  },

  async updateTodo(todo: Todo) {
    const todos = readTodos().map((t) =>
      t.id === todo.id ? { ...todo, updatedAt: new Date().toISOString() } : t
    );
    writeTodos(todos);
    const updated = todos.find((t) => t.id === todo.id);
    if (!updated) {
      throw new Error("TODO를 찾을 수 없습니다.");
    }
    return updated;
  },

  async deleteTodo(id: string) {
    const todos = readTodos().filter((t) => t.id !== id);
    writeTodos(todos);
  },
};

