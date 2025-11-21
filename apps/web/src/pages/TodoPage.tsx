import { useEffect } from "react";
import { Card, Stack, Group, Text } from "@mantine/core";
import { useTodos } from "../hooks/useTodos";
import { TodoInput } from "../components/TodoInput";
import { FilterBar } from "../components/FilterBar";
import { PriorityFilterBar } from "../components/PriorityFilterBar";
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
    setPriorityFilter,
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
          <Group gap="xs" wrap="wrap">
            <FilterBar value={state.filter} onChange={setFilter} />
            <PriorityFilterBar
              value={state.priorityFilter}
              onChange={setPriorityFilter}
            />
          </Group>
          <SearchBar value={state.searchQuery} onChange={setSearchQuery} />
        </Group>

        <TodoList
          todos={state.todos}
          filter={state.filter}
          priorityFilter={state.priorityFilter}
          searchQuery={state.searchQuery}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        <Text c="dimmed" size="sm">
          총 {state.todos.length}개의 할 일이 있습니다.
        </Text>
      </Stack>
    </Card>
  );
}

