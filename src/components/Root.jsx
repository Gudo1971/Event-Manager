import {
  Box,
  VStack,
  Button,
  Text,
  useColorModeValue,
  Stack,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { AddEventDialog } from "./AddEventDialog";
import { ColorModeButton } from "./ui/ColorModeButton";
import { SearchBar } from "./SearchBar";
import { FilterByCategory } from "./FilterByCategory";
import { useEvents } from "../context/EventsContext";
import { useState } from "react";
import { useSystemColorSync } from "./ui/useSystemColorSync";
import { useBreakpointValue } from "@chakra-ui/react";

export const Root = () => {
  const location = useLocation();
  useSystemColorSync();

  const showAside =
    location.pathname === "/" || location.pathname === "/events";

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const { categories } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ✅ verplaatst naar boven voor stabiele hook-volgorde
  const bg = useColorModeValue("gray.50", "gray.900");
  const sectionLabelColor = useColorModeValue("gray.500", "gray.400");

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  const AsideContent = (
    <VStack align="stretch" spacing={8}>
      <Navigation />

      {showAside && (
        <>
          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              mb={2}
              color={sectionLabelColor}
            >
              Actions
            </Text>
            <Button colorScheme="blue" onClick={onAddOpen} width="full">
              + Add Event
            </Button>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              mb={2}
              color={sectionLabelColor}
            >
              Search & Filter
            </Text>
            <VStack align="stretch" spacing={4}>
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for an Event"
              />
              <FilterByCategory
                categories={categories}
                selected={selectedCategories}
                onChange={setSelectedCategories}
              />
              <Button onClick={handleResetFilters} variant="outline">
                Reset Filters
              </Button>
            </VStack>
          </Box>

          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              mb={2}
              color={sectionLabelColor}
            >
              System
            </Text>
            <ColorModeButton />
          </Box>
        </>
      )}
    </VStack>
  );

  return (
    <Stack direction={{ base: "column", md: "row" }} minH="100vh" spacing={0}>
      {/* Mobile hamburger */}
      {!isDesktop && (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open menu"
            onClick={onDrawerOpen}
            position="fixed"
            top="4"
            left="4"
            zIndex="overlay"
          />
          <Drawer
            isOpen={isDrawerOpen}
            onClose={onDrawerClose}
            placement="left"
          >
            <DrawerOverlay />
            <DrawerContent bg={bg} p={4}>
              {AsideContent}
            </DrawerContent>
          </Drawer>
        </>
      )}

      {/* Desktop sidebar */}
      {isDesktop && (
        <Box
          w="300px"
          bg={bg}
          p={6}
          borderRight="1px solid"
          position="sticky"
          top="0"
          h="100vh"
          overflowY="auto"
        >
          {AsideContent}
        </Box>
      )}

      {/* Routed content */}
      <Box flex="1" p={{ base: 4, md: 8 }}>
        <Outlet
          context={{
            isAddEventOpen: isAddOpen,
            onAddEventChange: (open) => (open ? onAddOpen() : onAddClose()),
            searchTerm,
            selectedCategories,
          }}
        />
      </Box>

      <AddEventDialog isOpen={isAddOpen} onClose={onAddClose} />
    </Stack>
  );
};
