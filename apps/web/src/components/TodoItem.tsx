import { useState } from "react";
import {
  Checkbox,
  Group,
  Text,
  Button,
  Badge,
  TextInput,
  Select,
  Stack,
} from "@mantine/core";
import { Todo, TodoPriority } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (todo: Todo) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
}

const priorityLabel: Record<TodoPriority, string> = {
  low: "낮음",
  medium: "보통",
  high: "높음",
};

const priorityColor: Record<TodoPriority, string> = {
  low: "gray",
  medium: "blue",
  high: "red",
};

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [draftPriority, setDraftPriority] = useState<TodoPriority>(
    todo.priority
  );

  const handleToggle = () => {
    onUpdate({ ...todo, completed: !todo.completed });
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setDraftTitle(todo.title);
    setDraftPriority(todo.priority);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftTitle(todo.title);
    setDraftPriority(todo.priority);
  };

  const handleSave = () => {
    const trimmed = draftTitle.trim();
    if (!trimmed) return;
    onUpdate({ ...todo, title: trimmed, priority: draftPriority });
    setIsEditing(false);
  };

  return (
    <Group justify="space-between" align="flex-start">
      <Group align="flex-start" gap="xs">
        <Checkbox
          checked={todo.completed}
          onChange={handleToggle}
          mt={isEditing ? "sm" : 0}
        />
        {isEditing ? (
          <Stack gap="xs">
            <TextInput
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.currentTarget.value)}
              autoFocus
            />
            <Select
              aria-label="중요도"
              value={draftPriority}
              onChange={(value) =>
                setDraftPriority((value as TodoPriority) ?? "medium")
              }
              data={[
                { label: "낮음", value: "low" },
                { label: "보통", value: "medium" },
                { label: "높음", value: "high" },
              ]}
              size="xs"
              w={130}
            />
          </Stack>
        ) : (
          <Group gap="xs">
            <Text
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "gray" : undefined,
              }}
            >
              {todo.title}
            </Text>
            <Badge color={priorityColor[todo.priority]} size="sm" variant="light">
              {priorityLabel[todo.priority]}
            </Badge>
          </Group>
        )}
      </Group>
      <Group gap="xs">
        {isEditing ? (
          <>
            <Button
              variant="subtle"
              size="xs"
              onClick={handleCancel}
              color="gray"
            >
              취소
            </Button>
            <Button
              variant="subtle"
              size="xs"
              onClick={handleSave}
              disabled={draftTitle.trim().length === 0}
            >
              저장
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="subtle"
              size="xs"
              onClick={handleEditClick}
              color="gray"
            >
              수정
            </Button>
            <Button
              variant="subtle"
              size="xs"
              color="red"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </>
        )}
      </Group>
    </Group>
  );
}

