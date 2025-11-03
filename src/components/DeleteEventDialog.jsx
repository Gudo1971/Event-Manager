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
} from "@chakra-ui/react";
import { useDeleteEventLogic } from "../hooks/useDeleteEventLogic";

export const DeleteEventDialog = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  const {
    cancelRef,
    isConfirmOpen,
    onConfirmOpen,
    onConfirmClose,
    handleDelete,
  } = useDeleteEventLogic({ event, onClose });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          w={{ base: "95%", md: "500px" }}
          maxH="80vh"
          overflowY="auto"
        >
          <ModalHeader>Delete Event</ModalHeader>
          <ModalBody>
            <Text textAlign="center">
              Are you sure you want to delete "{event.title}"?
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
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
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent
          w={{ base: "90%", md: "500px" }}
          maxH="80vh"
          overflowY="auto"
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold" textAlign="center">
            Confirm Deletion
          </AlertDialogHeader>
          <AlertDialogBody textAlign="center">
            This action will permanently delete "{event.title}". Are you sure?
          </AlertDialogBody>
          <AlertDialogFooter justifyContent="center">
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
