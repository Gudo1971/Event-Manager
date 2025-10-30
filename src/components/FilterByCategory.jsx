import {
  Box,
  Text,
  Checkbox,
  VStack,
  Collapse,
  Button,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export const FilterByCategory = ({
  categories = [],
  selected = [],
  onChange,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const labelColor = useColorModeValue("gray.700", "gray.300");

  const handleToggle = (id) => {
    const newSelection = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(newSelection);
  };

  return (
    <Box>
      <Text fontSize="sm" fontWeight="bold" mb={2} color={labelColor}>
        Category Filter
      </Text>

      <Button
        onClick={onToggle}
        rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        variant="outline"
        size="sm"
        mb={2}
        w="full"
        justifyContent="space-between"
      >
        {isOpen ? "Hide Categories" : "Select Categories"}
      </Button>

      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" spacing={2} mt={2}>
          {categories.map((cat) => {
            const id = String(cat.id);
            const isChecked = Array.isArray(selected) && selected.includes(id);

            return (
              <Checkbox
                key={id}
                isChecked={isChecked}
                onChange={() => handleToggle(id)}
              >
                {cat.name}
              </Checkbox>
            );
          })}
        </VStack>
      </Collapse>
    </Box>
  );
};
