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
  Select,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const EditEventForm = ({
  isOpen,
  onClose,
  handleSubmit,
  categories,
  titleText = "Edit Event",
  ...fields
}) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("🟢 Submitting form");

    const result = await handleSubmit();
    console.log("✅ Submit result:", result);

    if (result?.success) {
      toast({
        title: "Event updated",
        description: `"${fields.title}" has been saved.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        onClose();
        navigate("/");
      }, 300);
    } else {
      toast({
        title: "Update failed",
        description: result?.error || "Something went wrong.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleFormSubmit}
        noValidate
        w={{ base: "95%", md: "600px" }}
      >
        <ModalHeader>{titleText}</ModalHeader>
        <ModalBody overflowY="auto" maxH="60vh">
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              required
              value={fields.title}
              onChange={(e) => fields.setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Location</FormLabel>
            <Input
              required
              value={fields.location}
              onChange={(e) => fields.setLocation(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Date</FormLabel>
            <DatePicker
              selected={fields.date ? new Date(fields.date) : null}
              onChange={(dateObj) =>
                fields.setDate(dateObj.toISOString().split("T")[0])
              }
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              customInput={<Input type="text" required />}
            />
          </FormControl>

          <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                required
                value={fields.startTime}
                onChange={(e) => fields.setStartTime(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                required
                value={fields.endTime}
                onChange={(e) => fields.setEndTime(e.target.value)}
              />
            </FormControl>
          </Stack>

          <FormControl mb={4}>
            <FormLabel>Image URL</FormLabel>
            <Input
              required
              value={fields.imageUrl}
              onChange={(e) => fields.setImageUrl(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              required
              value={fields.description}
              onChange={(e) => fields.setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Category</FormLabel>
            <Stack direction={{ base: "column", md: "row" }} spacing={3}>
              <Select
                required
                value={fields.categoryId}
                onChange={(e) => fields.setCategoryId(e.target.value)}
                placeholder="Select category"
                flex="1"
              >
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              <Button
                type="button"
                onClick={fields.onCatOpen}
                w={{ base: "full", md: "auto" }}
              >
                + Add
              </Button>
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
          <Button type="button" onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
