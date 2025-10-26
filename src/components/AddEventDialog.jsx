import {
  Dialog,
  Button,
  Input,
  Field,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export const AddEventDialog = ({ open, onOpenChange }) => {
  const titleRef = useRef(null);
  const startTimeRef = useRef(null);
  const imageUrlRef = useRef(null);
  const categoryRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSave = async () => {
    if (
      !titleRef.current ||
      !startTimeRef.current ||
      !imageUrlRef.current ||
      !categoryRef.current
    ) {
      console.error("❌ One or more refs are not mounted");
      return;
    }

    const eventData = {
      title: titleRef.current.value,
      startTime: startTimeRef.current.value,
      imageUrl: imageUrlRef.current.value,
      category: categoryRef.current.value,
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
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Backdrop />
      <Dialog.Positioner placement="center">
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Dialog.Title>Add Event</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Field.Root>
              <Field.Label>Title</Field.Label>
              <Input ref={titleRef} placeholder="Title" />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Start Time</Field.Label>
              <Input ref={startTimeRef} placeholder="Start Time" />
            </Field.Root>

            <Field.Root mt={4}>
              <Field.Label>Image URL</Field.Label>
              <Input
                ref={imageUrlRef}
                placeholder="Image URL"
                onBlur={handleImageChange}
              />
            </Field.Root>

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

            <Field.Root mt={4}>
              <Field.Label>Category</Field.Label>
              <Input ref={categoryRef} placeholder="Category" />
            </Field.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={() => onOpenChange(false)}>Cancel</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
