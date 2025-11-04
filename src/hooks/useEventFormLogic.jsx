import { useState, useEffect } from "react";

export const useEventFormLogic = ({ event }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setLocation(event.location || "");
      setDate(event.date || "");
      setStartTime(event.startTime || "");
      setEndTime(event.endTime || "");
      setImageUrl(event.imageUrl || "");
      setDescription(event.description || "");
      setCategoryId(event.categoryIds?.[0]?.toString() || "");
    }
  }, [event]);

  const hasChanges = () =>
    title.trim() !== event?.title ||
    location.trim() !== event?.location ||
    date !== event?.date ||
    startTime !== event?.startTime ||
    endTime !== event?.endTime ||
    imageUrl.trim() !== event?.imageUrl ||
    description.trim() !== event?.description ||
    categoryId !== event?.categoryIds?.[0]?.toString();

  const isValid = () =>
    title.trim() &&
    location.trim() &&
    date &&
    startTime &&
    endTime &&
    imageUrl.trim() &&
    description.trim() &&
    categoryId;

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setCategoryId("");
  };

  const values = {
    title,
    location,
    date,
    startTime,
    endTime,
    imageUrl,
    description,
    categoryId,
  };

  const setters = {
    setTitle,
    setLocation,
    setDate,
    setStartTime,
    setEndTime,
    setImageUrl,
    setDescription,
    setCategoryId,
  };

  return { values, setters, hasChanges, isValid, resetForm };
};
