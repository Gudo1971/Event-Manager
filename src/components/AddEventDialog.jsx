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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { useAddCategoryLogic } from "../hooks/useAddCategoryLogic";
import { useEventFormLogic } from "../hooks/useEventFormLogic.jsx";
import { EventForm } from "./EventForm";
import { CategoryModal } from "./CategoryModal";
import { InfoModal } from "./InfoModal";

export const AddEventDialog = ({ isOpen, onClose }) => {
  const { refetchEvents, categories, refetchCategories } = useEvents();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  const {
    isOpen: isInfoOpen,
    onOpen: openInfoModal,
    onClose: closeInfoModal,
  } = useDisclosure();

  const { values, setters, isValid, resetForm, hasChanges } = useEventFormLogic(
    { event: null }
  );

  const {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
  } = useAddCategoryLogic({
    onClose: onCatClose,
    onCategoryAdded: (newCat) => {
      setters.setCategoryId(newCat.id.toString());
      refetchCategories();
    },
  });

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

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

    const selectedDate = new Date(values.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      toast({
        title: "Invalid date",
        description: "Please select a valid future date.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const newEvent = {
      title: values.title,
      location: values.location,
      date: values.date,
      startTime: values.startTime,
      endTime: values.endTime,
      imageUrl: values.imageUrl,
      description: values.description,
      categoryIds: [Number(values.categoryId)],
    };

    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      toast({
        title: "Event added",
        description: `"${newEvent.title}" has been created.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      await refetchEvents();
      resetForm();
      onClose();
      navigate("/");
    } catch (err) {
      toast({
        title: "Creation failed",
        description: err.message || "Could not create the event.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCancel} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Event</ModalHeader>
          <ModalBody>
            <EventForm
              values={values}
              setters={setters}
              categories={categories}
              onCatOpen={onCatOpen}
              onInfoOpen={openInfoModal}
            />
          </ModalBody>
          <ModalFooter justifyContent="flex-end" gap={3}>
            <Button onClick={handleCancel} variant="ghost">
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
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
        hasChanges={() => newCategoryName.trim() !== ""}
      />

      <InfoModal isOpen={isInfoOpen} onClose={closeInfoModal} />
    </>
  );
};
