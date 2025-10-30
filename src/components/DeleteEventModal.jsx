import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";

export const DeleteEventModal = ({ isOpen, onClose, event }) => {
  const { refetchEvents } = useEvents();

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });

    refetchEvents(); // ✅ herlaadt lijst
    onClose(); // sluit modal
  };

  if (!event) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>
          <Text>Are you sure you want to delete "{event.title}"?</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
