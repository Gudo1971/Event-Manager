import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  HStack,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateInput } from "./DateInput";

export const EventForm = ({
  values,
  setters,
  categories,
  onCatOpen,
  onInfoOpen,
}) => {
  const fieldBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <>
      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Title</FormLabel>
        <Input
          required
          value={values.title}
          onChange={(e) => setters.setTitle(e.target.value)}
          bg={fieldBg}
          borderColor={borderColor}
        />
      </FormControl>

      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Location</FormLabel>
        <Input
          required
          value={values.location}
          onChange={(e) => setters.setLocation(e.target.value)}
          bg={fieldBg}
          borderColor={borderColor}
        />
      </FormControl>

      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Date</FormLabel>
        <DatePicker
          selected={values.date ? new Date(values.date) : null}
          onChange={(dateObj) =>
            setters.setDate(dateObj.toISOString().split("T")[0])
          }
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          customInput={
            <DateInput
              value={values.date}
              placeholder="Select date"
              error={!values.date ? "Date is required" : ""}
            />
          }
        />
      </FormControl>

      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        mb={{ base: 4, md: 6 }}
      >
        <FormControl>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="time"
            required
            value={values.startTime}
            onChange={(e) => setters.setStartTime(e.target.value)}
            bg={fieldBg}
            borderColor={borderColor}
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Time</FormLabel>
          <Input
            type="time"
            required
            value={values.endTime}
            onChange={(e) => setters.setEndTime(e.target.value)}
            bg={fieldBg}
            borderColor={borderColor}
          />
        </FormControl>
      </Stack>

      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Image URL</FormLabel>
        <Input
          required
          value={values.imageUrl}
          onChange={(e) => setters.setImageUrl(e.target.value)}
          bg={fieldBg}
          borderColor={borderColor}
        />
      </FormControl>

      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Description</FormLabel>
        <Textarea
          required
          value={values.description}
          onChange={(e) => setters.setDescription(e.target.value)}
          bg={fieldBg}
          borderColor={borderColor}
        />
      </FormControl>

      <FormControl mb={{ base: 4, md: 6 }}>
        <FormLabel>Category</FormLabel>
        <HStack spacing={3} align="start" flexWrap="wrap">
          <Select
            required
            value={values.categoryId}
            onChange={(e) => setters.setCategoryId(e.target.value)}
            placeholder="Select category"
            flex="1"
            bg={fieldBg}
            borderColor={borderColor}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Select>
          <IconButton
            icon={<InfoIcon color="white" boxSize="1.2em" />}
            aria-label="Category info"
            onClick={onInfoOpen}
            size="sm"
            isRound
            bg="blue.600"
            _hover={{ bg: "blue.700" }}
            height="32px"
          />
          <Button onClick={onCatOpen} size="sm">
            + Add
          </Button>
        </HStack>
      </FormControl>
    </>
  );
};
