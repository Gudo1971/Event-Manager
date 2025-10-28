// src/components/Root.jsx
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box, Flex } from "@chakra-ui/react";
import { AddEventDialog } from "./AddEventDialog";
import { useState } from "react";
import { ColorModeButton } from "./ui/ColorModeButton";

export const Root = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4}>
        <Navigation onAddEvent={() => setOpen(true)} />
        <ColorModeButton />
      </Flex>
      <Outlet />
      <AddEventDialog open={open} onOpenChange={setOpen} />
    </Box>
  );
};
