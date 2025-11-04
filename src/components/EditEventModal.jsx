import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { useAddCategoryLogic } from "../hooks/useAddCategoryLogic";
import { useEventFormLogic } from "../hooks/useEventFormLogic.jsx";
import { EventForm } from "./EventForm";
import { CategoryModal } from "./CategoryModal";

export const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
  const { refetchEvents, categories, refetchCategories } = useEvents();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  const { values, setters, hasChanges, isValid } = useEventFormLogic({ event });

  const {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
  } = useAddCategoryLogic({
    onClose: onCatClose,
    existingCategories: categories,
    onCategoryAdded: (newCat) => {
      setters.setCategoryId(newCat.id.toString());
      refetchCategories();
    },
  });

  const handleClose = () => {
    if (hasChanges()) {
      toast({
        title: "Nothing saved",
        description: "Your changes were discarded.",
        status: "info",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const start = new Date(values.startDate);
    const end = new Date(values.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      isNaN(start.getTime()) ||
      isNaN(end.getTime()) ||
      start < today ||
      end < start
    ) {
      toast({
        title: "Invalid dates",
        description:
          "Please select valid future dates. End date must be after start date.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const updatedEvent = {
      title: values.title,
      location: values.location,
      startDate: values.startDate,
      endDate: values.endDate,
      startTime: values.startTime,
      endTime: values.endTime,
      imageUrl: values.imageUrl,
      description: values.description,
      categoryIds: [Number(values.categoryId)],
    };

    try {
      const res = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      toast({
        title: "Event updated",
        description: `"${updatedEvent.title}" has been saved.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      await refetchEvents();
      onSave?.(updatedEvent);
      navigate("/");
    } catch (err) {
      toast({
        title: "Update failed",
        description: err.message || "Could not update the event.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const modalBg = useColorModeValue("white", "gray.800");

  if (!event) return null;

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent bg={modalBg} px={{ base: 4, md: 6 }} py={4}>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
            
            <EventForm
              values={values}
              setters={setters}
              categories={categories}
              onCatOpen={onCatOpen}
            />
          </ModalBody>
          <ModalFooter justifyContent="flex-end" gap={3}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={handleClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CategoryModal
        isOpen={isCatOpen}
        onClose={onCatClose}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        categoryError={categoryError}
        handleAddCategory={handleAddCategory}
        resetCategoryForm={resetCategoryForm}
        hasChanges={() => !!newCategoryName.trim()}
      />
    </>
  );
};
