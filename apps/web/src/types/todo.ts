export type TodoPriority = "low" | "medium" | "high";
export type TodoPriorityFilter = "all" | TodoPriority;

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: TodoPriority;
  createdAt: string;
  updatedAt: string;
}

