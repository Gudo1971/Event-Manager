import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Button,
  Checkbox,
  VStack,
  Box,
} from "@chakra-ui/react";

export const FilterByCategory = ({ categories, selected, onChange }) => {
  const handleToggle = (id) => {
    const newSelection = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(newSelection);
  };

  return (
    <Box mt={4}>
      <Popover>
        <PopoverTrigger>
          <Button>Filter by Category</Button>
        </PopoverTrigger>
        <PopoverContent maxH="300px" overflowY="auto">
          <PopoverHeader fontWeight="bold">Select Categories</PopoverHeader>
          <PopoverBody>
            <VStack align="start">
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  isChecked={selected.includes(String(cat.id))}
                  onChange={() => handleToggle(String(cat.id))}
                >
                  {cat.name}
                </Checkbox>
              ))}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
