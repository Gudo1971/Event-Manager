// src/pages/EventPage.jsx
import { Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
import { useEffect, useState } from "react";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((res) => res.json())
      .then(setEvent);

    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, [eventId]);

  if (!event || categories.length === 0) return null;

  return (
    <>
      <Heading>Event page</Heading>
      <EventDetail event={event} categories={categories} />
    </>
  );
};
