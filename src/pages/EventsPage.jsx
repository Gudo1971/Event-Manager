import { Heading, VStack, Button, HStack } from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { EventPreview } from "../components/EventPreview";
import { SearchBar } from "../components/SearchBar";
import { FilterByCategory } from "../components/FilterByCategory";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const filteredEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];
    if (searchTerm === "" && selectedCategories.length === 0) return events;

    return events.filter((ev) => {
      const title = ev.title?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      const matchesSearch = title.includes(term);
      const matchesCategory =
        selectedCategories.length === 0 ||
        (Array.isArray(ev.categoryIds)
          ? ev.categoryIds.some((id) => selectedCategories.includes(String(id)))
          : true);
      return matchesSearch && matchesCategory;
    });
  }, [events, searchTerm, selectedCategories]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <>
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
      <Heading mt={4}>List of events</Heading>
      {filteredEvents.length === 0 ? (
        <Heading size="md" mt={4}>
          No events match your current filters.
        </Heading>
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
