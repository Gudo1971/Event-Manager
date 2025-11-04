export const getCategoryColor = (categoryId) => {
  const colorSchemes = [
    "green",
    "purple",
    "orange",
    "red",
    "teal",
    "blue",
    "pink",
    "cyan",
  ];

  return colorSchemes[categoryId % colorSchemes.length] || "gray";
};
