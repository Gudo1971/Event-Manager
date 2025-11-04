import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useAddCategoryLogic = ({
  onClose,
  onCategoryAdded,
  existingCategories = [],
}) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const toast = useToast();

  const resetCategoryForm = () => {
    setNewCategoryName("");
    setCategoryError("");
  };

  const handleAddCategory = async () => {
    const trimmed = newCategoryName.trim().toLowerCase();

    if (!trimmed) {
      setCategoryError("Category name is required.");
      return;
    }

    const fuzzyMatch = existingCategories.some(
      (cat) =>
        cat.name.toLowerCase().includes(trimmed) ||
        trimmed.includes(cat.name.toLowerCase())
    );

    if (fuzzyMatch) {
      setCategoryError("A similar category already exists.");
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
  };
};
