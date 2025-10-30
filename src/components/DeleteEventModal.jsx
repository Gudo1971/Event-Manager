import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useEvents } from "../context/EventsContext";
import { useNavigate } from "react-router-dom";

export const DeleteEventModal = ({ isOpen, onClose, event }) => {
  const { refetchEvents } = useEvents();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const navigate = useNavigate();

  const cancelRef = useRef();

  const handleDelete = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    });

    refetchEvents();
    navigate("/"); // ✅ stuurt terug naar EventsPage
    onConfirmClose();
    onClose();
  };

  if (!event) return null;

  return (
    <>
      {/* Hoofdmodal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalBody>
            <Text>Are you sure you want to delete "{event.title}"?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onConfirmOpen}>
              Delete
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Bevestigingsalert */}
      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={onConfirmClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Deletion
          </AlertDialogHeader>

          <AlertDialogBody>
            This action will permanently delete "{event.title}". Are you sure?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onConfirmClose}>
              No, cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Yes, delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
