import { useDisclosure, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";

export const useDeleteEventLogic = ({ event, onClose }) => {
  const { refetchEvents } = useEvents();
  const toast = useToast();
  const navigate = useNavigate();
  const cancelRef = useRef();

  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

  const handleDelete = async () => {
    if (!event?.id) {
      toast({
        title: "Deletion failed",
        description: "Invalid event ID.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

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
        duration: 3000,
        isClosable: true,
      });

      await refetchEvents();

      setTimeout(() => {
        navigate("/");
        onConfirmClose();
        onClose();
      }, 300); // ✅ delay zodat toast zichtbaar blijft
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

  return {
    cancelRef,
    isConfirmOpen,
    onConfirmOpen,
    onConfirmClose,
    handleDelete,
  };
};
