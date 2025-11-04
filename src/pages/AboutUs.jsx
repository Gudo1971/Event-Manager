import {
  Box,
  Heading,
  Text,
  Stack,
  Icon,
  Avatar,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdLocationOn, MdCode, MdPhone, MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

const InfoBlock = ({ icon, iconColor, title, description, textColor }) => (
  <Stack direction="row" align="start" spacing={4}>
    <Icon as={icon} boxSize={6} color={iconColor} mt={1} />
    <Box>
      <Text fontWeight="bold" color={iconColor}>
        {title}
      </Text>
      <Text fontSize="sm" color={textColor}>
        {description}
      </Text>
    </Box>
  </Stack>
);

export const AboutUs = () => {
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("teal.600", "teal.300");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box minH="100vh" bg={bg}>
      <Box
        maxW="4xl"
        mx="auto"
        bg={cardBg}
        p={{ base: 6, md: 8 }}
        mt={8}
        borderRadius="2xl"
        boxShadow="xl"
      >
        <Heading size="xl" mb={4} color={headingColor}>
          About Skill Sessions
        </Heading>

        <Text fontSize="md" mb={6} color={textColor}>
          Skill Sessions is your personal gateway to local learning and
          community growth. It helps you discover workshops, events, and meetups
          that align with your interests whether you're into tech, creativity,
          wellness, or just curious to explore. From hands-on sessions to
          inspiring talks, Skill Sessions connects you with opportunities to
          grow and engage.
        </Text>

        <Text fontSize="md" mb={6} color={textColor}>
          This project was originally developed as part of my training program.
          I’ve rebuilt and refined it to showcase in my portfolio. Every
          component from data structure to UI polish is crafted with care to
          reflect my growth as a developer. The platform emphasizes responsive
          design, reusable logic, and a seamless user experience across
          filtering, navigation, and event interaction.
        </Text>

        <Stack spacing={6}>
          <InfoBlock
            icon={MdLocationOn}
            iconColor="blue.500"
            title="Location"
            description="Groningen, Netherlands"
            textColor={textColor}
          />
          <InfoBlock
            icon={MdCode}
            iconColor="green.500"
            title="Tech Stack"
            description="React, Vite, Chakra UI, React Hook Form"
            textColor={textColor}
          />
        </Stack>

        <Box mt={16}>
          <Divider mb={12} />
          <Heading size="lg" mb={6} color={headingColor}>
            About Me
          </Heading>
        </Box>

        <Stack spacing={12} align="center">
          <Avatar name="Gudo" src="/me.png" size="xl" />

          <Stack spacing={1} align="center">
            <Heading size="md" color={headingColor}>
              Gudo Gieles
            </Heading>
          </Stack>
          <Text
            fontSize="lg"
            fontStyle="italic"
            color={headingColor}
            textAlign="center"
            mb={6}
          >
            “I strive to create intuitive user experiences. Building scalable,
            intuitive UI.”
          </Text>
          <Text fontSize="sm" color={textColor}>
            Full Stack Developer in training
          </Text>
          <Text fontSize="sm" color={textColor} fontStyle="italic">
            Building clarity, structure, and scalable UI
          </Text>

          <Stack
            spacing={3}
            align="center"
            mt={4}
            p={4}
            borderRadius="md"
            bg={useColorModeValue("gray.100", "gray.700")}
          >
            <Stack direction="row" align="center" spacing={3}>
              <Icon as={MdPhone} color="blue.500" />
              <Text fontSize="sm" color={textColor}>
                +31 6 49038246
              </Text>
            </Stack>
            <Stack direction="row" align="center" spacing={3}>
              <Icon as={MdEmail} color="green.500" />
              <Text fontSize="sm" color={textColor}>
                g.gieles@telfort.nl
              </Text>
            </Stack>
            <Stack direction="row" align="center" spacing={3}>
              <Icon as={FaLinkedin} color="teal.500" />
              <Text
                fontSize="sm"
                color={textColor}
                as="a"
                href="https://www.linkedin.com/in/gudo-gieles-b956395b/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </Text>
            </Stack>
          </Stack>

          <Stack spacing={4} maxW="3xl" textAlign="center">
            <Text fontSize="md" color={textColor}>
              I’m a technically skilled problem-solver with a strong interest in
              software development and community building.
            </Text>
            <Text fontSize="md" color={textColor}>
              My background in psychology and experience in software development
              allow me to create environments where learning and contribution go
              hand in hand.
            </Text>
            <Text fontSize="md" color={textColor}>
              I’m currently focused on mastering React, Node.js, and UI
              architecture with a passion for building scalable, intuitive
              interfaces.
            </Text>
            <Text fontSize="md" color={textColor}>
              Let’s build something meaningful scalable, intuitive, and
              human-centered.
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
