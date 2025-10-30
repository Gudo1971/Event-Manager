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
import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import DatePicker from "react-datepicker";

export const AddEventDialog = ({ isOpen, onOpenChange }) => {
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

  const resetCategoryForm = () => {
    setNewCategoryName("");
  };

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setCategoryId("");
    setDate(""); // als je een apart date-veld hebt
  };

  const handleSubmit = async () => {
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

    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    refetchEvents();
    onOpenChange(false);
  };

  const handleAddCategory = async () => {
    await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName }),
    });

    setNewCategoryName("");
    refetchCategories();
    resetCategoryForm();
    onCatClose();
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
              <FormControl mb={3}>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  selected={date ? new Date(date) : null}
                  onChange={(dateObj) =>
                    setDate(dateObj.toISOString().split("T")[0])
                  }
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  customInput={<Input />} // ✅ Chakra-styled input
                />
              </FormControl>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>End Time</FormLabel>
              <Input
                type="datetime-local"
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
                  {categories.map((cat) => (
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
            <Button
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              ml={3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal voor nieuwe categorie */}
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
