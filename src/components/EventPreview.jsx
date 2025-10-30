import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export const EventPreview = ({ event, categories }) => {
  if (!event) return null;

  const categoryNames = Array.isArray(event.categoryIds)
    ? categories
        .filter((cat) => event.categoryIds.includes(cat.id))
        .map((cat) => cat.name)
        .join(", ")
    : "no category";

  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      bg={bg}
      borderColor={border}
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
    >
      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
      )}

      <Box p={4}>
        <Heading size="md" mb={2}>
          {event.title}
        </Heading>

        <Stack spacing={1}>
          <Text fontSize="sm" color={textColor}>
            {event.startTime} – {event.endTime}
          </Text>
          <Text fontSize="sm" color={textColor}>
            Categories: {categoryNames}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
