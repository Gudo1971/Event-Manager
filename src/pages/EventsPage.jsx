import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";
import { useOutletContext } from "react-router-dom";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { selectedCategories, searchTerm } = useOutletContext();
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

  const gridColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  return (
    <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      <Heading
        mb={{ base: 4, md: 6 }}
        fontSize={{ base: "2xl", md: "3xl" }}
        textAlign={{ base: "center", md: "left" }}
      >
        Skill Sessions & Community Events
      </Heading>

      <Text
        mb={{ base: 4, md: 6 }}
        fontSize={{ base: "md", md: "lg" }}
        textAlign={{ base: "center", md: "left" }}
      >
        Discover, join, and grow one event at a time.
      </Text>

      <Heading
        size="md"
        mb={4}
        fontSize={{ base: "lg", md: "xl" }}
        textAlign={{ base: "center", md: "left" }}
      >
        All Events
      </Heading>

      {showSkeletons ? (
        <SimpleGrid columns={gridColumns} spacing={6}>
          {Array.from({ length: 12 }).map((_, i) => (
            <VStack key={i} spacing={4} align="stretch">
              <Skeleton
                height={{ base: "180px", md: "200px" }}
                borderRadius="md"
              />
              <Skeleton height="24px" />
              <Skeleton height="16px" />
              <Skeleton height="40px" />
            </VStack>
          ))}
        </SimpleGrid>
      ) : filteredEvents.length === 0 ? (
        <Text textAlign="center" fontSize="lg">
          No events found.
        </Text>
      ) : (
        <SimpleGrid columns={gridColumns} spacing={6}>
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
