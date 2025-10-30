import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Tag,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventPreview = ({ event, categories }) => {
  if (!event || !categories || categories.length === 0) return null;

  const category = categories.find((cat) =>
    event.categoryIds?.includes(cat.id)
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack align="start" spacing={3}>
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          height="100%"
        />

        <Heading size="md">{event.title}</Heading>
        <Text>{event.description}</Text>
        <Text fontSize="sm" color="gray.500">
          {event.location}
        </Text>

        {category && <Tag colorScheme="blue">{category.name}</Tag>}

        <Link to={`/event/${event.id}`}>
          <Button colorScheme="teal" size="sm">
            View Details
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};
