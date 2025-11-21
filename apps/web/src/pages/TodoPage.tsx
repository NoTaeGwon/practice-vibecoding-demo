import { useEffect } from "react";
import { Card, Stack, Group, Text } from "@mantine/core";
import { useTodos } from "../hooks/useTodos";
import { TodoInput } from "../components/TodoInput";
import { FilterBar } from "../components/FilterBar";
import { SearchBar } from "../components/SearchBar";
import { TodoList } from "../components/TodoList";

export function TodoPage() {
  const {
    state,
    loadTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    setFilter,
    setSearchQuery,
  } = useTodos();

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  return (
    <Card
      withBorder
      radius="md"
      padding={{ base: "sm", sm: "md" }}
      shadow={{ base: "none", sm: "sm" }}
    >
      <Stack gap={{ base: "sm", sm: "md" }}>
        <TodoInput onAdd={addTodo} />

        <Group
          justify="space-between"
          gap={{ base: "xs", sm: "md" }}
          wrap="wrap"
        >
          <FilterBar value={state.filter} onChange={setFilter} />
          <SearchBar value={state.searchQuery} onChange={setSearchQuery} />
        </Group>

        <TodoList
          todos={state.todos}
          filter={state.filter}
          searchQuery={state.searchQuery}
          onToggleCompleted={updateTodo}
          onDelete={deleteTodo}
        />

        <Text c="dimmed" size="sm">
          총 {state.todos.length}개의 할 일이 있습니다.
        </Text>
      </Stack>
    </Card>
  );
}

