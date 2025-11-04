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
  useColorModeValue,
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
  const toast = useToast();

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

  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay />
        <ModalContent bg={modalBg} px={{ base: 4, md: 6 }} py={4}>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalBody>
            <Text color={textColor}>
              Are you sure you want to delete <strong>"{event.title}"</strong>?
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="flex-end" gap={3}>
            <Button colorScheme="red" onClick={onConfirmOpen}>
              Delete
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isConfirmOpen}
        leastDestructiveRef={cancelRef}
        onClose={onConfirmClose}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent bg={modalBg} px={{ base: 4, md: 6 }} py={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Confirm Deletion
          </AlertDialogHeader>

          <AlertDialogBody color={textColor}>
            This action will permanently delete <strong>"{event.title}"</strong>
            . Are you sure?
          </AlertDialogBody>

          <AlertDialogFooter justifyContent="flex-end" gap={3}>
            <Button ref={cancelRef} onClick={onConfirmClose}>
              No, cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Yes, delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
