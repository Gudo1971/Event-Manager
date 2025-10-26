import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { AddEventDialog } from "./AddEventDialog";
import { useState } from "react";

export const Root = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Navigation onAddEvent={() => setOpen(true)} />
      <Outlet />
      <AddEventDialog open={open} onOpenChange={setOpen} />
    </Box>
  );
};
