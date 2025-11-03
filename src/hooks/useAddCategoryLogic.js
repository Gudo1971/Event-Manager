import { useToast } from "@chakra-ui/react";
import { useEvents } from "../context/EventsContext";
import { useState } from "react";

export const useAddCategoryLogic = ({ onClose, onCategoryAdded }) => {
  const { categories, refetchCategories } = useEvents();
  const toast = useToast();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setCategoryError("");
  };

  const handleAddCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) {
      setCategoryError("Name is required.");
      return false;
    }

    const lower = name.toLowerCase();

    const fuzzyMatch = categories?.find((c) => {
      const existing = c.name.toLowerCase();
      return existing.includes(lower) || lower.includes(existing);
    });

    if (fuzzyMatch) {
      setCategoryError(`Did you mean "${fuzzyMatch.name}"?`);
      toast({
        title: "Did you mean…?",
        description: `"${fuzzyMatch.name}" looks similar to "${name}".`,
        status: "warning",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create category");

      const data = await res.json();

      toast({
        title: "Category created",
        description: `"${data.name}" has been added.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onCategoryAdded?.(data);
      resetCategoryForm();
      await refetchCategories();
      onClose?.();
      return true;
    } catch (err) {
      toast({
        title: "Error",
        description: err.message || "Could not create category.",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
  };

  return {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
  };
};
