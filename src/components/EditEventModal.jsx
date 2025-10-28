// src/components/EditEventModal.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    startTime: event.startTime,
    endTime: event.endTime,
    imageUrl: event.imageUrl || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const updated = await res.json();
    onSave(updated);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
