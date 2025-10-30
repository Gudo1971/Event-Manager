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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddEventDialog = ({ isOpen, onOpenChange }) => {
  const { refetchEvents, refetchCategories, categories } = useEvents();
  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  const toast = useToast();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setCategoryError("");
  };

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setCategoryId("");
    setDate("");
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen]);

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
        variant: "solid",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      toast({
        title: "Invalid date",
        description: "Please select a valid date.",
        status: "error",
        variant: "solid",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    if (selectedDate < today) {
      toast({
        title: "Date too early",
        description: "Date must be in the future.",
        status: "error",
        variant: "solid",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    const newEvent = {
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
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} – ${errorText}`);
      }

      toast({
        title: "Event created",
        description: `"${newEvent.title}" has been added.`,
        status: "success",
        variant: "solid",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onOpenChange(false);
      refetchEvents();
    } catch (err) {
      toast({
        title: "Creation failed",
        description: err.message || "Could not create the event.",
        status: "error",
        variant: "solid",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;

    const lowerName = name.toLowerCase();

    const exactMatch = categories?.find(
      (cat) => cat.name.toLowerCase() === lowerName
    );

    if (exactMatch) {
      setCategoryError(`Category "${name}" already exists.`);
      return;
    }

    const fuzzyMatch = categories?.find((cat) => {
      const existing = cat.name.toLowerCase();
      return (
        existing.includes(lowerName) ||
        lowerName.includes(existing) ||
        existing.startsWith(lowerName) ||
        lowerName.startsWith(existing)
      );
    });

    if (fuzzyMatch) {
      setCategoryError(`Did you mean "${fuzzyMatch.name}"?`);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create category");

      toast({
        title: "Category created",
        description: `"${name}" has been added.`,
        status: "success",
        variant: "solid",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      resetCategoryForm();
      refetchCategories();
      onCatClose();
    } catch (err) {
      toast({
        title: "Category creation failed",
        description: err.message || "Could not create the category.",
        status: "error",
        variant: "solid",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => onOpenChange(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
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
                onChange={(dateObj) =>
                  setDate(dateObj.toISOString().split("T")[0])
                }
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
                customInput={<Input />}
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
                  placeholder="Select category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {Array.isArray(categories) &&
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </Select>
                <Button onClick={onCatOpen}>+ Add</Button>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={() => onOpenChange(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCatOpen} onClose={onCatClose}>
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
                <FormLabel color="red.500" fontSize="sm" mt={2}>
                  {categoryError}
                </FormLabel>
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
    </>
  );
};
