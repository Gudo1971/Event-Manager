import { VStack, HStack, Icon, Text, Image } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";

export const EventDetail = ({ event, categories }) => {
  if (!event) return null;

  const categoryNames = Array.isArray(event.categoryIds)
    ? categories
        .filter((cat) => event.categoryIds.includes(cat.id))
        .map((cat) => cat.name)
        .join(", ")
    : "Geen categorie";

  const parsedDate = new Date(event.date);
  const formattedDate = isNaN(parsedDate)
    ? event.date
    : parsedDate.toLocaleDateString("nl-NL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

  return (
    <VStack align="start" spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        {event.title}
      </Text>

      <Text>{event.description}</Text>

      <HStack>
        <Icon as={MdLocationOn} color="gray.500" />
        <Text>{event.location}</Text>
      </HStack>

      <HStack>
        <CalendarIcon color="gray.500" />
        <Text>{formattedDate}</Text>
      </HStack>

      <HStack>
        <TimeIcon color="gray.500" />
        <Text>Start: {event.startTime}</Text>
      </HStack>

      <HStack>
        <TimeIcon color="gray.500" />
        <Text>Einde: {event.endTime}</Text>
      </HStack>

      {event.image && (
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          maxH="300px"
        />
      )}

      <Text fontSize="sm" color="gray.600">
        Categorieën: {categoryNames}
      </Text>
    </VStack>
  );
};
