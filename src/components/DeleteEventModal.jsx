import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const DeleteEventModal = ({ isOpen, onClose, event }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("✅ Event deleted");
          navigate("/");
        } else {
          console.error("❌ Delete failed");
        }
      })
      .catch((err) => {
        console.error("❌ Delete error:", err);
      });
  };
  const navigate = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Event</ModalHeader>
        <ModalBody>Are you sure you want to delete this event?</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
