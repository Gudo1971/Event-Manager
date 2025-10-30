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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useEvents } from "../context/EventsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditEventModal = ({ isOpen, onClose, event }) => {
  const { refetchEvents, refetchCategories, categories } = useEvents();
  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

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

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setCategoryError("");
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
      alert("Please fill in all required fields.");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime())) {
      alert("Please select a valid date.");
      return;
    }

    if (selectedDate < today) {
      alert("Date must be in the future.");
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

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} – ${errorText}`);
      }

      refetchEvents();
      onClose();
    } catch (err) {
      console.error("❌ Failed to update event:", err);
      alert("Failed to update event. See console for details.");
    }
  };

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;

    const lowerName = name.toLowerCase();

    const exactMatch = categories.find(
      (cat) => cat.name.toLowerCase() === lowerName
    );

    if (exactMatch) {
      setCategoryError(`Category "${name}" already exists.`);
      return;
    }

    const fuzzyMatch = categories.find((cat) => {
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

    await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setNewCategoryName("");
    setCategoryError("");
    refetchCategories();
    onCatClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="div" noValidate>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Title</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                formNoValidate
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Location</FormLabel>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                formNoValidate
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
                minDate={new Date()}
                customInput={
                  <Input
                    type="text"
                    required={false}
                    formNoValidate
                    autoComplete="off"
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
                formNoValidate
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                formNoValidate
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                formNoValidate
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                formNoValidate
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Category</FormLabel>
              <HStack>
                <Select
                  placeholder="Select category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  formNoValidate
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                <Button type="button" onClick={onCatOpen}>
                  + Add
                </Button>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button type="button" colorScheme="blue" onClick={handleSubmit}>
              Save
            </Button>
            <Button type="button" onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isCatOpen} onClose={onCatClose}>
        <ModalOverlay />
        <ModalContent as="div" noValidate>
          <ModalHeader>Add Category</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                formNoValidate
              />
              {categoryError && (
                <FormLabel color="red.500" fontSize="sm" mt={2}>
                  {categoryError}
                </FormLabel>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              colorScheme="green"
              onClick={handleAddCategory}
            >
              Add
            </Button>
            <Button
              type="button"
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
