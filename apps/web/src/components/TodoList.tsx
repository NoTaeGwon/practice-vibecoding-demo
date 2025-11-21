import { Stack, Text } from "@mantine/core";
import { Todo } from "../types/todo";
import { TodoFilter } from "../reducers/todoReducer";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilter;
  searchQuery: string;
  onToggleCompleted: (todo: Todo) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

export function TodoList({
  todos,
  filter,
  searchQuery,
  onToggleCompleted,
  onDelete,
}: TodoListProps) {
  const filtered = todos.filter((todo) => {
    if (filter === "active" && todo.completed) return false;
    if (filter === "completed" && !todo.completed) return false;
    if (searchQuery && !todo.title.includes(searchQuery)) return false;
    return true;
  });

  if (filtered.length === 0) {
    return <Text c="dimmed">표시할 할 일이 없습니다.</Text>;
  }

  return (
    <Stack gap="xs">
      {filtered.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleCompleted={onToggleCompleted}
          onDelete={onDelete}
        />
      ))}
    </Stack>
  );
}


