import {
  Heading,
  useDisclosure,
  Box,
  Button,
  VStack,
  HStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Skeleton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { EventDetail } from "../components/EventDetail";
import { useEffect, useState } from "react";
import { EditEventModal } from "../components/EditEventModal";
import { DeleteEventModal } from "../components/DeleteEventModal";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:3000/events/${eventId}`),
          fetch("http://localhost:3000/categories"),
        ]);

        const eventData = await eventRes.json();
        const categoryData = await categoriesRes.json();

        setEvent(eventData);
        setCategories(categoryData);

        setTimeout(() => setIsLoading(false), 300);
      } catch (err) {
        console.error("❌ Fetch error:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const handleSave = (updateEvent) => {
    setEvent(updateEvent);
    onEditClose();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete event");

      console.log("✅ Event deleted");
      onDeleteClose();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  const buttonLayout = useBreakpointValue({ base: "column", sm: "row" });

  if (isLoading) {
    return (
      <Box
        maxW="4xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        py={{ base: 6, md: 10 }}
      >
        <Card variant="outline" p={{ base: 4, md: 6 }}>
          <CardHeader>
            <Skeleton height="32px" width={{ base: "150px", md: "200px" }} />
          </CardHeader>

          <CardBody>
            <Skeleton height={{ base: "180px", md: "200px" }} mb={4} />
            <Skeleton height="20px" mb={2} />
            <Skeleton height="20px" mb={2} />
            <Skeleton height="20px" mb={2} />
          </CardBody>

          <CardFooter>
            <VStack align="stretch" spacing={4} w="full">
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </VStack>
          </CardFooter>
        </Card>
      </Box>
    );
  }

  if (!event || categories.length === 0) {
    return (
      <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
        Event not found.
      </Box>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
      <Card variant="outline" p={{ base: 4, md: 6 }}>
        <CardHeader>
          <Heading
            size="lg"
            fontSize={{ base: "xl", md: "2xl" }}
            textAlign={{ base: "center", md: "left" }}
          >
            Event Details
          </Heading>
        </CardHeader>

        <CardBody>
          <EventDetail event={event} categories={categories} />
        </CardBody>

        <CardFooter>
          {buttonLayout === "column" ? (
            <VStack align="stretch" spacing={4} w="full">
              <Button colorScheme="blue" onClick={onEditOpen}>
                Edit Event
              </Button>
              <Button colorScheme="red" onClick={onDeleteOpen}>
                Delete Event
              </Button>
            </VStack>
          ) : (
            <HStack spacing={4} w="full" justify="flex-end">
              <Button colorScheme="blue" onClick={onEditOpen}>
                Edit Event
              </Button>
              <Button colorScheme="red" onClick={onDeleteOpen}>
                Delete Event
              </Button>
            </HStack>
          )}
        </CardFooter>
      </Card>

      <EditEventModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        event={event}
        onSave={handleSave}
      />
      <DeleteEventModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        event={event}
        onDelete={handleDelete}
      />
    </Box>
  );
};
