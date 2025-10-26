import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
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
  return (
    <>
      <Heading>List of events</Heading>
      <ul>
        {events.map((event) => (
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
