import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";
import { Header } from "../components/Header";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { searchTerm, selectedCategories } = useOutletContext();

  const validEvents = Array.isArray(events)
    ? events.filter(
        (ev) =>
          typeof ev.title === "string" &&
          ev.title.trim() !== "" &&
          Array.isArray(ev.categoryIds) &&
          ev.categoryIds.every((id) => typeof id === "number")
      )
    : [];

  const filteredEvents = useMemo(() => {
    if (searchTerm === "" && selectedCategories.length === 0)
      return validEvents;

    return validEvents.filter((ev) => {
      const title = ev.title?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      const matchesSearch = title.includes(term);
      const matchesCategory =
        selectedCategories.length === 0 ||
        ev.categoryIds.some((id) => selectedCategories.includes(String(id)));
      return matchesSearch && matchesCategory;
    });
  }, [validEvents, searchTerm, selectedCategories]);

  const bg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="7xl" py={8}>
      {/* 🔹 Hero section */}
      <Box mb={10}>
        <Header />
      </Box>

      {/* 🔹 Content heading */}
      <Heading size="md" mb={6}>
        List of events
      </Heading>

      {/* 🔹 Event list */}
      {filteredEvents.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500">
            No events match your current filters.
          </Text>
        </Box>
      ) : (
        <VStack as="ul" spacing={6} align="stretch">
          {filteredEvents.map((event) => (
            <Box as="li" key={event.id} listStyleType="none">
              <Link to={`/event/${event.id}`}>
                <EventPreview event={event} categories={categories} bg={bg} />
              </Link>
            </Box>
          ))}
        </VStack>
      )}
    </Container>
  );
};
