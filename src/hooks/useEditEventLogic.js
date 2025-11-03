import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";

export const useEditEventLogic = ({ isOpen, event }) => {
  const { categories, refetchEvents } = useEvents();

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

  useEffect(() => {
    if (isOpen && event) {
      setTitle(event.title ?? "");
      setLocation(event.location ?? "");
      setDate(event.date ?? "");
      setStartTime(event.startTime ?? "");
      setEndTime(event.endTime ?? "");
      setImageUrl(event.imageUrl ?? "");
      setDescription(event.description ?? "");
      setCategoryId(event.categoryIds?.[0]?.toString() ?? "");
    }
  }, [isOpen, event]);

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
      return { success: false, error: "Missing fields" };
    }

    const updatedEvent = {
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
      const res = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });

      if (!res.ok) throw new Error("Failed to update event");

      await refetchEvents();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
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
  };
};
