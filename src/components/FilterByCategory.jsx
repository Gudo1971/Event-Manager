import { Checkbox, VStack } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const FilterByCategory = ({ categories }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeCategoryId = parseInt(searchParams.get("category"));

  const handleChange = (catId) => {
    // Toggle: als al actief, reset naar alle events
    if (activeCategoryId === catId) {
      navigate("/events");
    } else {
      navigate(`/events?category=${catId}`);
    }
  };

  return (
    <VStack align="start" spacing={2} mb={6}>
      {categories.map((cat) => (
        <Checkbox
          key={cat.id}
          isChecked={activeCategoryId === cat.id}
          onChange={() => handleChange(cat.id)}
        >
          {cat.name}
        </Checkbox>
      ))}
    </VStack>
  );
};
