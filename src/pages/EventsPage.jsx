import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";
import { Header } from "../components/Header";
export const EventsPage = () => {
  const { events, categories } = useEvents();
  const [searchParams] = useSearchParams();

  const categoryId = parseInt(searchParams.get("category"));
  const filteredEvents = !isNaN(categoryId)
    ? events.filter((event) => event.categoryIds?.includes(categoryId))
    : events;

  const isLoading = !Array.isArray(events) || events.length === 0;

  return (
    <Box maxW="6xl" mx="auto" py={8}>
      <Header />
      <Heading mb={6}>All Events</Heading>

      {isLoading ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Array.from({ length: 6 }).map((_, i) => (
            <VStack key={i} spacing={4} align="stretch">
              <Skeleton height="200px" borderRadius="md" />
              <Skeleton height="24px" />
              <Skeleton height="16px" />
              <Skeleton height="40px" />
            </VStack>
          ))}
        </SimpleGrid>
      ) : filteredEvents.length === 0 ? (
        <Text>No events found.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredEvents.map((event) => (
            <EventPreview
              key={event.id}
              event={event}
              categories={categories}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};
