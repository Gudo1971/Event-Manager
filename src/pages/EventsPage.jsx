import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";

import { useOutletContext } from "react-router-dom";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { selectedCategories, searchTerm } = useOutletContext(); // ✅ uit Root
  const [showSkeletons, setShowSkeletons] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeletons(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      event.categoryIds?.some((id) => selectedCategories.includes(String(id)));

    const matchesSearch =
      searchTerm.trim() === "" ||
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <Box maxW="7xl" mx="auto" py={8}>
      <Heading mb={6}>Skill Sessions & Community Events</Heading>
      <Text mb={6}>Discover, join, and grow one event at a time.</Text>

      <Heading size="md" mb={4}>
        All Events
      </Heading>

      {showSkeletons ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Array.from({ length: 12 }).map((_, i) => (
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
