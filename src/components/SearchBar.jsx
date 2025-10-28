import { Input } from "@chakra-ui/react";

export const SearchBar = ({ value, onChange, placeholder = "Search" }) => (
  <Input value={value} onChange={onChange} placeholder={placeholder} mb={4} />
);
