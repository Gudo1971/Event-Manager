import { VStack, HStack, Icon, Text, Image, Tag, Wrap } from "@chakra-ui/react";
import { CalendarIcon, TimeIcon } from "@chakra-ui/icons";
import { MdLocationOn } from "react-icons/md";

const colorSchemes = [
  "green",
  "purple",
  "orange",
  "red",
  "teal",
  "blue",
  "pink",
  "cyan",
];

export const EventDetail = ({ event, categories }) => {
  if (!event) return null;

  const matchedCategories = Array.isArray(event.categoryIds)
    ? categories.filter((cat) => event.categoryIds.includes(cat.id))
    : [];

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

      {matchedCategories.length > 0 && (
        <Wrap>
          {matchedCategories.map((cat) => {
            const color = colorSchemes[cat.id % colorSchemes.length];
            return (
              <Tag key={cat.id} colorScheme={color}>
                {cat.name}
              </Tag>
            );
          })}
        </Wrap>
      )}
    </VStack>
  );
};
