import { Select } from "@mantine/core";
import type { TodoPriorityFilter } from "../types/todo";

interface PriorityFilterBarProps {
  value: TodoPriorityFilter;
  onChange: (value: TodoPriorityFilter) => void;
}

export function PriorityFilterBar({
  value,
  onChange,
}: PriorityFilterBarProps) {
  return (
    <Select
      aria-label="중요도 필터"
      value={value}
      onChange={(v) => onChange((v as TodoPriorityFilter) ?? "all")}
      data={[
        { label: "전체 중요도", value: "all" },
        { label: "낮음만", value: "low" },
        { label: "보통만", value: "medium" },
        { label: "높음만", value: "high" },
      ]}
      size="sm"
      w={160}
    />
  );
}


