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
  useToast,
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
  const toast = useToast(); // ✅ officiële Chakra toast

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete event");

      toast({
        title: "Event deleted",
        description: `"${event.title}" has been removed.`,
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });

      await refetchEvents();
      navigate("/");
      onConfirmClose();
      onClose();
    } catch (err) {
      toast({
        title: "Deletion failed",
        description: err.message || "Could not delete the event.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if (!event) return null;

  return (
    <>
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
