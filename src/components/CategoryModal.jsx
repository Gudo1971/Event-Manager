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
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const CategoryModal = ({
  isOpen,
  onClose,
  newCategoryName,
  setNewCategoryName,
  categoryError,
  handleAddCategory,
  resetCategoryForm,
  hasChanges,
  isEdit,
}) => {
  const toast = useToast();

  useEffect(() => {
    if (isOpen) resetCategoryForm();
  }, [isOpen]);

  const handleCancel = () => {
    if (hasChanges?.()) {
      toast({
        title: "Nothing saved",
        description: "Your changes were discarded.",
        status: "info",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
    resetCategoryForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? "Edit Category" : "Add Category"}</ModalHeader>
        <ModalBody>
          <FormControl isInvalid={!!categoryError}>
            <FormLabel>Category name</FormLabel>
            <Input
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Workshop"
            />
            <FormErrorMessage>{categoryError}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="flex-end" gap={3}>
          <Button onClick={handleCancel} variant="ghost">
            Cancel
          </Button>
          <Button onClick={handleAddCategory} colorScheme="blue">
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
