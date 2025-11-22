import { useState, FormEvent } from "react";
import { Button, Group, TextInput, Select } from "@mantine/core";
import type { TodoPriority } from "../types/todo";

interface TodoInputProps {
  onAdd: (title: string, priority: TodoPriority) => Promise<void> | void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TodoPriority>("medium");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    await onAdd(trimmed, priority);
    setTitle("");
  };

  const isEmpty = title.trim().length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" gap="xs" wrap="nowrap">
        <TextInput
          data-testid="todo-input"
          placeholder="할 일을 입력하세요"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          flex={1}
        />
        <Select
          data-testid="priority-select"
          aria-label="중요도"
          value={priority}
          onChange={(value) => setPriority((value as TodoPriority) ?? "medium")}
          data={[
            { label: "낮음", value: "low" },
            { label: "보통", value: "medium" },
            { label: "높음", value: "high" },
          ]}
          size="sm"
          w={160}
        />
        <Button
          data-testid="add-todo-button"
          type="submit"
          disabled={isEmpty}
          mt={{ base: "xs", sm: 0 }}
        >
          추가
        </Button>
      </Group>
    </form>
  );
}

