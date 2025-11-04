import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  Tag,
  HStack,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { getCategoryColor } from "../utils/getCategoryColor";

export const EventPreview = ({ event, categories }) => {
  if (!event || !categories || categories.length === 0) return null;

  const matchedCategories = categories.filter((cat) =>
    event.categoryIds?.includes(cat.id)
  );

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const locationColor = useColorModeValue("gray.600", "gray.400");
  const descriptionColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Link to={`/event/${event.id}`}>
      <Box
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        p={4}
        minHeight={{ base: "400px", md: "480px" }}
        display="flex"
        flexDirection="column"
        transition="transform 0.2s ease-out, box-shadow 0.2s ease-out"
        _hover={{
          boxShadow: "lg",
          zIndex: 10,
          transform: "scale(1.03)",
        }}
      >
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          objectFit="cover"
          width="100%"
          height={{ base: "160px", md: "200px" }}
          mb={4}
        />

        <VStack align="start" spacing={3} flexGrow={1}>
          <Heading fontSize={{ base: "md", md: "lg" }}>{event.title}</Heading>

          <Text
            noOfLines={3}
            fontSize={{ base: "sm", md: "md" }}
            color={descriptionColor}
          >
            {event.description}
          </Text>

          <HStack spacing={1}>
            <Icon as={MdLocationOn} color="gray.500" />
            <Text fontSize="sm" color={locationColor}>
              {event.location}
            </Text>
          </HStack>

          <HStack wrap="wrap" spacing={2} mt={2} mb={2}>
            {matchedCategories.map((cat) => (
              <Tag key={cat.id} colorScheme={getCategoryColor(cat.id)}>
                {cat.name}
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};
