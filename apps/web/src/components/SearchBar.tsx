import { TextInput } from "@mantine/core";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <TextInput
      placeholder="제목으로 검색..."
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      w={{ base: "100%", sm: 220 }}
    />
  );
}


