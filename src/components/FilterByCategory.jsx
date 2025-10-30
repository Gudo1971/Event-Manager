import {
  Box,
  Heading,
  Button,
  Checkbox,
  Stack,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useState } from "react";

export const FilterByCategory = ({ categories, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (id) => {
    const idStr = String(id);
    const next = selected.includes(idStr)
      ? selected.filter((c) => c !== idStr)
      : [...selected, idStr];
    onChange(next);
  };

  return (
    <Box>
      <Heading size="sm" mb={4}>
        Category Filter
      </Heading>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        variant="outline"
        size="sm"
        w="full"
        textAlign="left"
      >
        {selected.length > 0
          ? `${selected.length} selected`
          : "Select categories"}
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <Box mt={3}>
          <Stack>
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                isChecked={selected.includes(String(category.id))}
                onChange={() => handleToggle(category.id)}
              >
                {category.name}
              </Checkbox>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
