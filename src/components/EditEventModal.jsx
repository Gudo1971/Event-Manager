import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  HStack,
  useDisclosure,
  useToast,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import { useAddCategoryLogic } from "../hooks/useAddCategoryLogic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

export const EditEventModal = ({ isOpen, onClose, event }) => {
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

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
  } = useAddCategoryLogic({
    onClose: onCatClose,
    onCategoryAdded: (newCat) => {
      setCategoryId(newCat.id.toString());
      refetchCategories();
    },
  });

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setLocation(event.location || "");
      setDate(event.date || "");
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setImageUrl(event.imageUrl || "");
      setDescription(event.description || "");
      setCategoryId(event.categoryIds?.[0]?.toString() || "");
    }
  }, [event]);

  const handleClose = () => {
    const hasChanges =
      title.trim() !== event?.title ||
      location.trim() !== event?.location ||
      date !== event?.date ||
      startTime !== event?.startTime ||
      endTime !== event?.endTime ||
      imageUrl.trim() !== event?.imageUrl ||
      description.trim() !== event?.description ||
      categoryId !== event?.categoryIds?.[0]?.toString();

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

    onClose();
  };

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !location.trim() ||
      !date ||
      !startTime ||
      !endTime ||
      !imageUrl.trim() ||
      !description.trim() ||
      !categoryId
    ) {
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

    const selectedDate = new Date(date);
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

    const updatedEvent = {
      title,
      location,
      date,
      startTime,
      endTime,
      imageUrl,
      description,
      categoryIds: [Number(categoryId)],
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
      onClose();
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Date</FormLabel>
              <DatePicker
                selected={date ? new Date(date) : null}
                onChange={(d) => setDate(d.toISOString().split("T")[0])}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                customInput={
                  <Input
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: "gray.400" }}
                    _focus={{
                      borderColor: "blue.500",
                      boxShadow: "0 0 0 1px #3182ce",
                    }}
                  />
                }
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Category</FormLabel>
              <HStack>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  placeholder="Select category"
                  flex="1"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                <Button onClick={onCatOpen}>+ Add</Button>
                <IconButton
                  icon={<InfoIcon color="white" boxSize="1.2em" />}
                  aria-label="Category info"
                  onClick={openInfoModal}
                  size="sm"
                  isRound
                  _hover={{ bg: "blue.700" }}
                  height="32px"
                />
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={handleClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Category Modal */}
      <Modal isOpen={isCatOpen} onClose={onCatClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              {categoryError && (
                <Text color="red.500" fontSize="sm" mt={2}>
                  {categoryError}
                </Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleAddCategory}>
              Add
            </Button>
            <Button
              onClick={() => {
                onCatClose();
                resetCategoryForm();
              }}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Info Modal */}
      <Modal isOpen={isInfoOpen} onClose={closeInfoModal} isCentered>
        <ModalOverlay />
        <ModalContent w={{ base: "95%", md: "400px" }}>
          <ModalHeader>How it works</ModalHeader>
          <ModalBody>
            <Text>
              When you add a category, it will automatically appear in the
              dropdown menu of the event form. No refresh is needed — it's
              instantly available for selection.
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button onClick={closeInfoModal} colorScheme="blue">
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
