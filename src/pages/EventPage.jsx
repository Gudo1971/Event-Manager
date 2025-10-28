// src/pages/EventPage.jsx
import { Heading, useDisclosure, Box, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
import { useEffect, useState } from "react";
import { EditEventModal } from "../components/EditEventModal";
import { DeleteEventModal } from "../components/DeleteEventModal";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
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
    onEditClose();
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      // Optioneel: redirect of feedback
      console.log("Event deleted");
      onDeleteClose();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };
  if (!event || categories.length === 0) return null;

  return (
    <>
      <Heading>Event page</Heading>

      <Box p={4}>
        <EventDetail event={event} categories={categories} />
        <Button mt={4} colorScheme="blue" onClick={onEditOpen}>
          Edit Event
        </Button>

        <EventDetail event={event} categories={categories} />
        <Button mt={4} colorScheme="blue" onClick={onDeleteOpen}>
          Delete Event
        </Button>

        <EditEventModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          event={event}
          onSave={handleSave}
        />
        <DeleteEventModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          event={event}
          onDelete={handleDelete}
        />
      </Box>
    </>
  );
};
