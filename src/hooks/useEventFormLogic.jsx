import { useState, useEffect } from "react";

export const useEventFormLogic = ({ event }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setLocation(event.location || "");
      setStartDate(event.startDate || "");
      setEndDate(event.endDate || "");
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
    startDate !== event?.startDate ||
    endDate !== event?.endDate ||
    startTime !== event?.startTime ||
    endTime !== event?.endTime ||
    imageUrl.trim() !== event?.imageUrl ||
    description.trim() !== event?.description ||
    categoryId !== event?.categoryIds?.[0]?.toString();

  const isValid = () =>
    title.trim() &&
    location.trim() &&
    startDate &&
    endDate &&
    startTime &&
    endTime &&
    imageUrl.trim() &&
    description.trim() &&
    categoryId;

  const resetForm = () => {
    setTitle("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setImageUrl("");
    setDescription("");
    setCategoryId("");
  };

  const values = {
    title,
    location,
    startDate,
    endDate,
    startTime,
    endTime,
    imageUrl,
    description,
    categoryId,
  };

  const setters = {
    setTitle,
    setLocation,
    setStartDate,
    setEndDate,
    setStartTime,
    setEndTime,
    setImageUrl,
    setDescription,
    setCategoryId,
  };

  return { values, setters, hasChanges, isValid, resetForm };
};
