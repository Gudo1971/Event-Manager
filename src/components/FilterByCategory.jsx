import {
  CheckboxGroup,
  Checkbox,
  Stack,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
console.log("🧪 CheckboxGroup:", typeof CheckboxGroup);
console.log("🧪 Checkbox:", typeof Checkbox);
export const FilterByCategory = ({ categories = [], selected, onChange }) => {
  const handleChange = (value) => {
    const safeArray = Array.isArray(value) ? value : [value];
    console.log("✅ selectedCategories:", safeArray);
    onChange(safeArray);
  };

  const handleReset = () => {
    console.log("🔄 Reset filters");
    onChange([]);
  };

  return (
    <Box
      as="fieldset"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
    >
      <Text as="legend" fontSize="sm" mb={2} fontWeight="medium">
        Filter op categorie
      </Text>

      <CheckboxGroup value={selected} onChange={handleChange}>
        <Stack spacing={2}>
          {categories.length === 0 ? (
            <Text fontSize="sm" color="gray.500">
              Geen categorieën beschikbaar
            </Text>
          ) : (
            categories.map((cat, index) => (
              <Checkbox key={cat.id ?? index} value={String(cat.id ?? index)}>
                {cat.name ?? `Categorie ${index + 1}`}
              </Checkbox>
            ))
          )}
        </Stack>
      </CheckboxGroup>

      <Button mt={4} size="sm" onClick={handleReset} variant="outline">
        Reset filters
      </Button>
    </Box>
  );
};
