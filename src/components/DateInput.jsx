import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { CalendarIcon } from "@chakra-ui/icons";

export const DateInput = forwardRef(
  ({ value, onClick, placeholder, error }, ref) => {
    const bg = useColorModeValue("white", "gray.800");
    const color = useColorModeValue("gray.800", "gray.100");
    const placeholderColor = useColorModeValue("gray.500", "gray.400");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const focusBorderColor = useColorModeValue("blue.500", "blue.300");

    return (
      <FormControl isInvalid={!!error} mb={{ base: 4, md: 6 }}>
        <InputGroup>
          <Input
            ref={ref}
            value={value}
            onClick={onClick}
            placeholder={placeholder}
            readOnly
            bg={bg}
            color={color}
            _placeholder={{ color: placeholderColor }}
            borderColor={borderColor}
            focusBorderColor={focusBorderColor}
            cursor="pointer"
            fontSize={{ base: "sm", md: "md" }}
            height={{ base: "36px", md: "40px" }}
            pr={10}
          />
          <InputRightElement>
            <IconButton
              icon={<CalendarIcon />}
              aria-label="Open calendar"
              size="sm"
              variant="ghost"
              onClick={onClick}
              color={placeholderColor}
            />
          </InputRightElement>
        </InputGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    );
  }
);

DateInput.displayName = "DateInput";
