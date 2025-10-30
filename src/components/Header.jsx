import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

export const Header = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const accent = useColorModeValue("blue.600", "blue.300");

  return (
    <Box
      bg={bg}
      py={10}
      px={6}
      textAlign="center"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Heading fontSize={["2xl", "3xl", "4xl"]} mb={2}>
        Skill Sessions & Community Events
      </Heading>
      <Text fontSize="lg" color={accent}>
        Discover, join, and grow one event at a time.
      </Text>
    </Box>
  );
};
