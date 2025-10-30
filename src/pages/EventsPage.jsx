import {
  Container,
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";
import { SearchBar } from "../components/SearchBar";
import { FilterByCategory } from "../components/FilterByCategory";
import { AddEventDialog } from "../components/AddEventDialog";
import { Header } from "../components/Header";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { isAddEventOpen, onAddEventChange } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  const bg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="6xl" py={8}>
      <Header />
      <AddEventDialog isOpen={isAddEventOpen} onOpenChange={onAddEventChange} />

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an Event"
      />

      <HStack mt={6} spacing={4}>
        <FilterByCategory
          categories={categories}
          selected={selectedCategories}
          onChange={(value) => {
            if (Array.isArray(value)) setSelectedCategories(value);
          }}
        />
        <Button onClick={handleResetFilters} colorScheme="gray">
          Reset Filters
        </Button>
      </HStack>

      <Heading mt={10} mb={6}>
        List of events
      </Heading>

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
