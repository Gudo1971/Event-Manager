import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useDisclosure,
  Stack,
  Select,
  HStack,
  useToast,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { AddCategoryModal } from "./AddCategoryModal";
import { useAddCategoryLogic } from "../hooks/useAddCategoryLogic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditEventDialog = ({ isOpen, onClose, event }) => {
  const toast = useToast();
  const { categories, refetchEvents } = useEvents();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  const {
    isOpen: isCatModalOpen,
    onOpen: openCategoryModal,
    onClose: closeCategoryModal,
  } = useDisclosure();

  const {
    isOpen: isInfoOpen,
    onOpen: openInfoModal,
    onClose: closeInfoModal,
  } = useDisclosure();

  const {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
  } = useAddCategoryLogic({
    onClose: closeCategoryModal,
    onCategoryAdded: (newCat) => {
      setSelectedCategoryIds([newCat.id]);
    },
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setLocation(event.location || "");
      setDate(event.date ? new Date(event.date) : null);
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setImageUrl(event.imageUrl || "");
      setDescription(event.description || "");
      setSelectedCategoryIds(event.categoryIds || []);
    }
  }, [event]);

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setDate(null);
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setSelectedCategoryIds([]);
  };

  const handleUpdateEvent = async () => {
    const payload = {
      title,
      location,
      date: date?.toISOString().split("T")[0],
      startTime,
      endTime,
      imageUrl,
      description,
      categoryIds: selectedCategoryIds,
    };

    try {
      const res = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update event");

      await refetchEvents();

      toast({
        title: "Event updated",
        description: `"${title}" has been saved.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      resetForm();
      onClose();
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Could not update event.",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    const hasChanges =
      title.trim() !== event?.title ||
      location.trim() !== event?.location ||
      date?.toISOString().split("T")[0] !== event?.date ||
      startTime !== event?.startTime ||
      endTime !== event?.endTime ||
      imageUrl.trim() !== event?.imageUrl ||
      description.trim() !== event?.description ||
      JSON.stringify(selectedCategoryIds) !== JSON.stringify(event?.categoryIds);

    if (hasChanges) {
      toast({
        title: "Nothing saved",
        description: "Your changes were discarded.",
        status: "info",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }

    resetForm();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent w={{ base: "95%", md: "600px" }}>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Location</FormLabel>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  dateFormat="yyyy-MM-dd"
                  customInput={
                    <Input
                      placeholder="Select a date"
                      bg="white"
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.400" }}
                      _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                    />
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional notes or context"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <HStack spacing={2} align="flex-end">
                  <Select
                    flex="1"
                    placeholder="Select category"
                    value={selectedCategoryIds[0] ?? ""}
                    onChange={(e) =>
                      setSelectedCategoryIds([Number(e.target.value)])
                    }
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </Select>
                  <Button onClick={openCategoryModal} size="sm">
                    + Add
                  </Button>
                  <IconButton
                    icon={<InfoIcon color="white" boxSize="1.2em" />}
                    aria-label="Category info"
                    onClick={openInfoModal}
                    size="sm"
                    isRound
                    bg="blue.600"
                    _hover={{ bg: "blue.700" }}
                    height="32px"
                  />
                </HStack>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row" spacing={3}>
              <Button colorScheme="green" onClick={handleUpdateEvent}>
                Save
              </Button>
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AddCategoryModal
        isOpen={isCatModalOpen}
        onClose={() => {
          closeCategoryModal();
          resetCategoryForm();
        }}
        newCategoryName={newCategoryName}
        setNewCategoryName={setNewCategoryName}
        categoryError={categoryError}
        handleAddCategory={handleAddCategory}
      />

      <Modal isOpen={isInfoOpen} onClose={closeInfoModal} isCentered>
        <ModalOverlay />
        <ModalContent w={{ base: