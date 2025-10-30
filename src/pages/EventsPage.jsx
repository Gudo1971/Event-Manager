import { Heading, VStack, Button, HStack, Text } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { EventPreview } from "../components/EventPreview";
import { SearchBar } from "../components/SearchBar";
import { FilterByCategory } from "../components/FilterByCategory";
import { AddEventDialog } from "../components/AddEventDialog";

export const EventsPage = () => {
  const { events, categories } = useEvents();
  const { isAddEventOpen, onAddEventChange } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 🛡️ Filter foute events weg
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

  return (
    <>
      <AddEventDialog isOpen={isAddEventOpen} onOpenChange={onAddEventChange} />

      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an Event"
      />

      <HStack mt={4} spacing={4}>
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

      <Heading mt={6}>List of events</Heading>

      {filteredEvents.length === 0 ? (
        <Text mt={4}>No events match your current filters.</Text>
      ) : (
        <VStack as="ul" spacing={4} mt={4} align="stretch">
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <Link to={`/event/${event.id}`}>
                <EventPreview event={event} categories={categories} />
              </Link>
            </li>
          ))}
        </VStack>
      )}
    </>
  );
};
