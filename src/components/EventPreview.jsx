import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Tag,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { getCategoryColor } from "../utils/getCategoryColor";

export const EventPreview = ({ event, categories }) => {
  if (!event || !categories || categories.length === 0) return null;

  const matchedCategories = categories.filter((cat) =>
    event.categoryIds?.includes(cat.id)
  );

  return (
    <Link to={`/event/${event.id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        minHeight="480px"
        display="flex"
        flexDirection="column"
        transition="transform 0.2s ease-out, box-shadow 0.2s ease-out"
        _hover={{
          boxShadow: "lg",
          zIndex: 10,
          transform: "scale(1.20)",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          height="200px"
          mb={4}
        />

        <VStack align="start" spacing={3} flexGrow={1}>
          <Heading size="md">{event.title}</Heading>
          <Text noOfLines={3}>{event.description}</Text>

          <HStack>
            <Icon as={MdLocationOn} color="gray.500" />
            <Text fontSize="sm" color="gray.600">
              {event.location}
            </Text>
          </HStack>

          <HStack wrap="wrap" spacing={2} mt={2} mb={2}>
            {matchedCategories.map((cat) => (
              <Tag key={cat.id} colorScheme={getCategoryColor(cat.id)} mr={2}>
                {cat.name}
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};
