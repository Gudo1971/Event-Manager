import { useState, useRef } from "react";

export const useEditCategoryLogic = ({ category }) => {
  const initialNameRef = useRef(category?.name || "");

  const [name, setName] = useState(initialNameRef.current);
  const [error, setError] = useState("");

  const hasChanges = () => name.trim() !== initialNameRef.current.trim();

  const resetForm = () => {
    setName(initialNameRef.current);
    setError("");
  };

  const handleUpdate = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/categories/${category.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name.trim() }),
        }
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      return true;
    } catch (err) {
      setError(err.message || "Could not update category");
      return false;
    }
  };

  return {
    name,
    setName,
    error,
    setError,
    handleUpdate,
    resetForm,
    hasChanges,
  };
};
