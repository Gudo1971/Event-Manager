import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const Header = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box textAlign="center" mb={10}>
      <Heading size="lg" mb={2}>
        Skill Sessions & Community Events
      </Heading>
      <Text fontSize="md" color={textColor}>
        Discover, join, and grow one event at a time.
      </Text>
    </Box>
  );
};
