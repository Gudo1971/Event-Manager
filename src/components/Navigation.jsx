import { Flex, Link, Button } from "@chakra-ui/react";

export const Navigation = ({ onAddEvent }) => {
  return (
    <nav>
      <Flex gap={2}>
        <Link href="/">Events</Link>
        <Button
          onClick={() => {
            console.log("clicked");
            onAddEvent();
          }}
          variant="ghost"
        >
          Add Event
        </Button>
      </Flex>
    </nav>
  );
};
