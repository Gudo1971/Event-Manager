import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const Header = () => {
  const textColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box textAlign="center" mb={{ base: 6, md: 10 }} px={{ base: 4, md: 0 }}>
      <Heading
        size="lg"
        mb={2}
        fontSize={{ base: "xl", md: "2xl" }}
        lineHeight="short"
      >
        Skill Sessions & Community Events
      </Heading>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color={textColor}
        maxW="600px"
        mx="auto"
      >
        Discover, join, and grow one event at a time.
      </Text>
    </Box>
  );
};
