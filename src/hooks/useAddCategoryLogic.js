import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useAddCategoryLogic = ({ onClose, onCategoryAdded }) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const toast = useToast();

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setCategoryError("");
  };

  const cancelCategoryForm = () => {
    resetCategoryForm();
    toast({
      title: "Nothing saved",
      description: "Your changes were discarded.",
      status: "info",
      position: "top-right",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      setCategoryError("Category name is required.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const newCat = await res.json();

      toast({
        title: "Category added",
        description: `"${newCat.name}" has been created.`,
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });

      onCategoryAdded?.(newCat);
      onClose();
    } catch (err) {
      toast({
        title: "Failed to add category",
        description: err.message || "Something went wrong.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return {
    newCategoryName,
    setNewCategoryName,
    categoryError,
    handleAddCategory,
    resetCategoryForm,
    cancelCategoryForm, // ✅ nieuw
  };
};
