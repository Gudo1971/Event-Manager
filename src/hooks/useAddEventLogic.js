import { useState } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";
import { ensureCategoryExists } from "../utils/ensureCategoryExists";

export const useAddEventLogic = ({ onClose }) => {
  const { refetchEvents, categories } = useEvents();
  const toast = useToast();

  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: onCatClose,
  } = useDisclosure();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setCategoryId("");
    setNewCategoryName("");
    setCategoryError("");
  };

  const handleSubmit = async () => {
    if (
      !title ||
      !location ||
      !date ||
      !startTime ||
      !endTime ||
      !imageUrl ||
      !description ||
      (!categoryId && !newCategoryName)
    ) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    try {
      const finalCategoryId = categoryId
        ? Number(categoryId)
        : await ensureCategoryExists(newCategoryName);

      const newEvent = {
        title,
        location,
        date,
        startTime,
        endTime,
        imageUrl,
        description,
        categoryIds: [finalCategoryId],
      };

      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("Failed to create event");

      toast({
        title: "Event created",
        description: `"${title}" has been added.`,
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });

      await refetchEvents();
      resetForm();
      onClose();
    } catch (err) {
      toast({
        title: "Creation failed",
        description: err.message || "Could not create the event.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return {
    title,
    setTitle,
    location,
    setLocation,
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    imageUrl,
    setImageUrl,
    description,
    setDescription,
    categoryId,
    setCategoryId,
    newCategoryName,
    setNewCategoryName,
    categoryError,
    setCategoryError,
    isCatOpen,
    onCatOpen,
    onCatClose,
    categories,
    handleSubmit,
    resetForm,
  };
};
