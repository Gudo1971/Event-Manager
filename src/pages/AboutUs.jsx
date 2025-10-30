import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

export const AboutUs = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Container maxW="4xl" py={12}>
      <VStack spacing={6} align="start">
        <Heading size="lg">About Us</Heading>

        <Text fontSize="md" color={textColor}>
          We believe in building communities through skill-sharing and
          meaningful events. Our platform connects people with opportunities to
          learn, grow, and collaborate — one event at a time.
        </Text>

        <Heading size="md" pt={6}>
          Our Mission
        </Heading>
        <Text fontSize="md" color={textColor}>
          To empower individuals by making learning and connection accessible,
          fun, and impactful.
        </Text>

        <Heading size="md" pt={6}>
          Our Team
        </Heading>
        <Text fontSize="md" color={textColor}>
          We're a small group of developers, designers, and community builders
          who care deeply about creating inclusive spaces for growth.
        </Text>

        <Heading size="md" pt={6}>
          Contact
        </Heading>
        <Text fontSize="md" color={textColor}>
          Want to collaborate or share feedback? Reach out via email or connect
          with us on GitHub.
        </Text>
      </VStack>
    </Container>
  );
};
