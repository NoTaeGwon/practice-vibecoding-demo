import { useState, FormEvent } from "react";
import { Button, Group, TextInput } from "@mantine/core";

interface TodoInputProps {
  onAdd: (title: string) => Promise<void> | void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setTitle("");
  };

  const isEmpty = title.trim().length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <Group align="flex-end" gap="xs" wrap="wrap">
        <TextInput
          label="할 일 추가"
          placeholder="예: 공부하기"
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          flex={1}
        />
        <Button
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

