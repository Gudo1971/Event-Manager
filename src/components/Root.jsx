import {
  Box,
  Flex,
  VStack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { AddEventDialog } from "./AddEventDialog";
import { ColorModeButton } from "./ui/ColorModeButton";
import { useDisclosure } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";
import { FilterByCategory } from "./FilterByCategory";
import { useEvents } from "../context/EventsContext";
import { useState } from "react";
import { useSystemColorSync } from "./ui/useSystemColorSync";

export const Root = () => {
  const location = useLocation();
  useSystemColorSync();
  const showAside =
    location.pathname === "/" || location.pathname === "/events";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useEvents();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const bg = useColorModeValue("gray.50", "gray.900");
  const sectionLabelColor = useColorModeValue("gray.500", "gray.400");

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
  };

  return (
    <Flex minH="100vh">
      {/* ⬅️ Sticky Aside with Navigation */}
      <Box
        w="300px"
        bg={bg}
        p={6}
        borderRight="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        position="sticky"
        top="0"
        alignSelf="flex-start"
        h="100vh"
        overflowY="auto"
      >
        <VStack align="stretch" spacing={8}>
          {/* 🔹 Navigatie altijd zichtbaar */}
          <Navigation />

          {/* 🔹 Alleen tonen op lijstpagina's */}
          {showAside && (
            <>
              {/* Acties */}
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  mb={2}
                  color={sectionLabelColor}
                >
                  Actions
                </Text>
                <Button colorScheme="blue" onClick={onOpen}>
                  + Add Event
                </Button>
              </Box>

              {/* Zoek & Filter */}
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

              {/* Systeem */}
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
      </Box>

      {/* ➡️ Routed content */}
      <Box flex="1" p={8}>
        <Outlet
          context={{
            isAddEventOpen: isOpen,
            onAddEventChange: (open) => (open ? onOpen() : onClose()),
            searchTerm,
            selectedCategories,
          }}
        />
      </Box>

      <AddEventDialog
        isOpen={isOpen}
        onOpenChange={(open) => (open ? onOpen() : onClose())}
      />
    </Flex>
  );
};
