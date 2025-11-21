import { SegmentedControl } from "@mantine/core";
import { TodoFilter } from "../reducers/todoReducer";

interface FilterBarProps {
  value: TodoFilter;
  onChange: (value: TodoFilter) => void;
}

export function FilterBar({ value, onChange }: FilterBarProps) {
  return (
    <SegmentedControl
      value={value}
      onChange={(v) => onChange(v as TodoFilter)}
      data={[
        { label: "전체", value: "all" },
        { label: "진행중", value: "active" },
        { label: "완료", value: "completed" },
      ]}
    />
  );
}


