import {
  VStack,
  HStack,
  Icon,
  Text,
  Image,
  Tag,
  Wrap,
  useColorModeValue,
} from "@chakra-ui/react";
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
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const formattedDate =
    isNaN(start.getTime()) || isNaN(end.getTime())
      ? "Datum onbekend"
      : `${start.toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })} – ${end.toLocaleDateString("nl-NL", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}`;
  const labelColor = useColorModeValue("gray.600", "gray.400");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <VStack
      align="start"
      spacing={{ base: 4, md: 6 }}
      px={{ base: 4, md: 0 }}
      py={{ base: 4, md: 6 }}
      maxW="700px"
      mx="auto"
      color={textColor}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
        {event.title}
      </Text>
      {event.imageUrl && (
        <Image
          src={event.imageUrl}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          maxH={{ base: "200px", md: "300px" }}
          mt={2}
        />
      )}
      <Text fontSize={{ base: "sm", md: "md" }}>{event.description}</Text>

      <HStack spacing={2}>
        <Icon as={MdLocationOn} color={labelColor} />
        <Text fontSize="sm">{event.location}</Text>
      </HStack>

      <HStack spacing={2}>
        <CalendarIcon color={labelColor} />
        <Text fontSize="sm">{formattedDate}</Text>
      </HStack>

      <HStack spacing={2}>
        <TimeIcon color={labelColor} />
        <Text fontSize="sm">Start: {event.startTime}</Text>
      </HStack>

      <HStack spacing={2}>
        <TimeIcon color={labelColor} />
        <Text fontSize="sm">Einde: {event.endTime}</Text>
      </HStack>

      {matchedCategories.length > 0 && (
        <Wrap spacing={2} mt={2}>
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
