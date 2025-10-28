import { Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
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
      .then((data) => {
        console.log("✅ events fetched:", data);
        setEvents(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ categories fetched:", data);
        setCategories(data);
      });
  }, []);

  const filteredEvents = events.filter((ev) => {
    const title = ev.title?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = title.includes(term);

    const matchesCategory =
      selectedCategories.length === 0 ||
      (Array.isArray(ev.categoryIds) &&
        ev.categoryIds.some((id) => selectedCategories.includes(String(id))));

    return matchesSearch && matchesCategory;
  });

  console.log("✅ selectedCategories:", selectedCategories);
  console.log("✅ searchTerm:", searchTerm);
  console.log("✅ filteredEvents:", filteredEvents);
  console.log(
    "✅ event.categoryIds:",
    events.map((e) => e.categoryIds)
  );

  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an Event"
      />

      <FilterByCategory
        categories={categories}
        selected={selectedCategories}
        onChange={(value) => {
          if (Array.isArray(value)) {
            setSelectedCategories(value);
          } else {
            console.warn("⚠️ Unexpected value in onChange:", value);
          }
        }}
      />

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
                <EventDetail event={event} categories={categories} />
              </Link>
            </li>
          ))}
        </VStack>
      )}
    </>
  );
};
