import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";

export const useAddEventLogic = ({ isOpen, onClose }) => {
  const { categories, refetchEvents, refetchCategories } = useEvents();
  const toast = useToast();

  const {
    isOpen: isCatOpen,
    onOpen: onCatOpen,
    onClose: rawCatClose,
  } = useDisclosure();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Reset velden bij sluiten
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setLocation("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setImageUrl("");
      setDescription("");
      setCategoryId("");
    }
  }, [isOpen]);

  // Sluit categorie-modal en refresh lijst
  const handleCategoryModalClose = async () => {
    rawCatClose();
    await refetchCategories();
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
      !categoryId
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

    const newEvent = {
      title,
      location,
      date,
      startTime,
      endTime,
      imageUrl,
      description,
      categoryIds: [Number(categoryId)],
    };

    try {
      const res = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (!res.ok) throw new Error("Server error");

      toast({
        title: "Event created",
        description: `"${title}" has been added.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      await refetchEvents();
    } catch (err) {
      toast({
        title: "Creation failed",
        description: err.message,
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
    isCatOpen,
    onCatOpen,
    onCatClose: handleCategoryModalClose,
    categories,
    handleSubmit,
  };
};
