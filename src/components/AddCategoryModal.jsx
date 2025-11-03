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
  Button,
  Text,
} from "@chakra-ui/react";
import { useAddCategoryLogic } from "../hooks/useAddCategoryLogic";

export const AddCategoryModal = ({ isOpen, onClose }) => {
  const {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
  } = useAddCategoryLogic({ onClose });

  const handleSubmit = async () => {
    console.log("🟢 Submitting category");
    await handleAddCategory(); // ✅ toast en modal sluiten gebeuren in de hook
  };

  console.log("🟣 Modal rendered");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w={{ base: "95%", md: "500px" }}
        maxH="80vh"
        overflowY="auto"
      >
        <ModalHeader>Add Category</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!categoryError}>
            <FormLabel>Name</FormLabel>
            <Input
              required
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            {categoryError && (
              <Text color="red.400" fontSize="sm" mt={2}>
                {categoryError}
              </Text>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="green" onClick={handleSubmit}>
            Add
          </Button>
          <Button onClick={onClose} ml={3}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
