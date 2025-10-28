// src/pages/EventPage.jsx
import { Heading, useDisclosure, Box, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
import { useEffect, useState } from "react";
import { EditEventModal } from "../components/EditEventModal";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((res) => res.json())
      .then(setEvent);

    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, [eventId]);

  const handleSave = (updateEvent) => {
    setEvent(updateEvent);
    onClose();
  };

  if (!event || categories.length === 0) return null;

  return (
    <>
      <Heading>Event page</Heading>

      <Box p={4}>
        <EventDetail event={event} categories={categories} />
        <Button mt={4} colorScheme="blue" onClick={onOpen}>
          Edit Event
        </Button>

        <EditEventModal
          isOpen={isOpen}
          onClose={onClose}
          event={event}
          onsave={handleSave}
        />
      </Box>
    </>
  );
};
