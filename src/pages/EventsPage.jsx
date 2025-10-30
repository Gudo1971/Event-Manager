import { Box, Heading, SimpleGrid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { EventPreview } from "../components/EventPreview";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/events"),
          fetch("http://localhost:3000/categories"),
        ]);

        const eventsData = await eventsRes.json();
        const categoryData = await categoriesRes.json();

        setEvents(eventsData);
        setCategories(categoryData);

        // ⏱️ Forceer skeleton-tijd
        setTimeout(() => setIsLoading(false), 300);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Box maxW="6xl" mx="auto" py={8}>
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
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {events.map((event) => (
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
