import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const AddEventDialog = ({ open, onOpenChange }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const imageUrlRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const locationRef = useRef(null);
  const categoryRef = useRef(null);

  const handleSave = async () => {
    if (
      !titleRef.current ||
      !descriptionRef.current ||
      !locationRef.current ||
      !dateRef.current ||
      !startTimeRef.current ||
      !endTimeRef.current ||
      !imageUrlRef.current ||
      !categoryRef.current
    ) {
      console.error("❌ One or more refs are not mounted");
      return;
    }

    const eventData = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      date: dateRef.current.value,
      startTime: startTimeRef.current.value,
      endTime: endTimeRef.current.value,
      imageUrl: imageUrlRef.current.value,
      category: categoryRef.current.value,
      categoryIds: [categoryRef.current.value],
    };

    console.log("📦 Uploading eventData:", eventData);

    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      console.log("📬 Response status:", response.status);

      if (!response.ok) throw new Error("Upload failed");

      console.log("✅ Event uploaded");
      onOpenChange(false);
    } catch (err) {
      console.error("❌ Upload error:", err);
    }
  };

  const handleImageChange = () => {
    const url = imageUrlRef.current?.value || "";
    setPreviewUrl(url);
  };

  return (
    <Modal isOpen={open} onClose={() => onOpenChange(false)} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input ref={titleRef} placeholder="Title" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input ref={descriptionRef} placeholder="Description" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input ref={locationRef} placeholder="Location" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <Input ref={dateRef} type="date" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Start Time</FormLabel>
            <Input ref={startTimeRef} type="time" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>End Time</FormLabel>
            <Input ref={endTimeRef} type="time" />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              ref={imageUrlRef}
              placeholder="Image URL"
              onBlur={handleImageChange}
            />
          </FormControl>

          {previewUrl && (
            <Box mt={4}>
              <Text fontSize="sm" mb={2}>
                Image Preview:
              </Text>
              <Image
                src={previewUrl}
                alt="Event preview"
                borderRadius="md"
                maxH="200px"
                objectFit="cover"
              />
            </Box>
          )}

          <FormControl mt={4}>
            <FormLabel>Category</FormLabel>
            <Input ref={categoryRef} placeholder="Category" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={() => onOpenChange(false)}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
