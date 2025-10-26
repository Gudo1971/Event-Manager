import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
import { SearchBar } from "../components/SearchBar";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  const filteredEvents = events.filter((ev) => {
    const title = ev.title?.toLowerCase() || "";
    const category = ev.category?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return title.includes(term) || category.includes(term);
  });
  return (
    <>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for an Event"
      />

      <Heading>List of events</Heading>
      {filteredEvents.length === 0 && (
        <Heading size="md" mt={4}>
          No events found for: "{searchTerm}"
        </Heading>
      )}
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>
            <Link to={`/event/${event.id}`}>
              <EventDetail event={event} categories={categories} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
