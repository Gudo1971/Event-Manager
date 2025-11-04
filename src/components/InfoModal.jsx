import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export const InfoModal = ({ isOpen, onClose }) => {
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        w={{ base: "95%", md: "400px" }}
        bg={bg}
        color={textColor}
        borderRadius="md"
        boxShadow="lg"
      >
        <ModalHeader fontSize="lg" fontWeight="bold">
          How it works
        </ModalHeader>
        <ModalBody>
          <Text fontSize="sm">
            When you add a category, it will automatically appear in the
            dropdown menu of the event form. No refresh is needed — it's
            instantly available for selection.
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button onClick={onClose} colorScheme="blue">
            Got it
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
