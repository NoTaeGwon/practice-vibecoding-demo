import { Checkbox, Group, Text, ActionIcon } from "@mantine/core";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleCompleted: (todo: Todo) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

export function TodoItem({ todo, onToggleCompleted, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    onToggleCompleted({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Group justify="space-between">
      <Group gap="xs">
        <Checkbox checked={todo.completed} onChange={handleToggle} />
        <Text
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "gray" : undefined,
          }}
        >
          {todo.title}
        </Text>
      </Group>
      <ActionIcon color="red" variant="subtle" onClick={handleDelete}>
        삭제
      </ActionIcon>
    </Group>
  );
}


