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
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DateInput } from "./DateInput";

export const EventForm = ({ values, setters, categories, onCatOpen }) => {
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
        <FormLabel> Start date</FormLabel>
        <DatePicker
          selected={values.startDate ? new Date(values.startDate) : null}
          onChange={(dateObj) =>
            setters.setStartDate(dateObj.toISOString().split("T")[0])
          }
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          customInput={
            <DateInput
              value={values.startDate}
              placeholder="Select start date"
              error={!values.startDate ? "Start date is required" : ""}
            />
          }
        />
        <FormLabel> End date</FormLabel>
        <DatePicker
          selected={values.endDate ? new Date(values.endDate) : null}
          onChange={(dateObj) =>
            setters.setEndDate(dateObj.toISOString().split("T")[0])
          }
          dateFormat="yyyy-MM-dd"
          minDate={values.startDate ? new Date(values.startDate) : new Date()}
          customInput={
            <DateInput
              value={values.endDate}
              placeholder="Select end date"
              error={!values.endDate ? "End date is required" : ""}
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
        <HStack justify="space-between" align="center" mb={1}>
          <FormLabel mb="0">Image URL</FormLabel>
          <Tooltip
            label="Upload your image using a hosting service like Imgur or Cloudinary, and paste the direct link here."
            fontSize="sm"
            hasArrow
            placement="top"
          >
            <IconButton
              icon={<InfoIcon />}
              size="sm"
              variant="ghost"
              aria-label="Image URL info"
            />
          </Tooltip>
        </HStack>
        <Input
          required
          value={values.imageUrl}
          onChange={(e) => setters.setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
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
          <Tooltip
            label="Categories help group events. You can add new ones if needed."
            fontSize="sm"
            hasArrow
            placement="top"
          >
            <IconButton
              icon={<InfoIcon />}
              size="sm"
              variant="ghost"
              aria-label="Category info"
            />
          </Tooltip>
          <Button onClick={onCatOpen} size="sm">
            + Add
          </Button>
        </HStack>
      </FormControl>
    </>
  );
};
