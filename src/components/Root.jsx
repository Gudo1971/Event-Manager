import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Flex } from "@chakra-ui/react";
import { AddEventDialog } from "./AddEventDialog";
import { ColorModeButton } from "./ui/ColorModeButton";
import { useDisclosure } from "@chakra-ui/react";

export const Root = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4}>
        <Navigation onAddEvent={onOpen} />
        <ColorModeButton />
      </Flex>

      <Outlet
        context={{
          isAddEventOpen: isOpen,
          onAddEventChange: (open) => (open ? onOpen() : onClose()),
        }}
      />

      <AddEventDialog
        isOpen={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      />
    </Box>
  );
};
