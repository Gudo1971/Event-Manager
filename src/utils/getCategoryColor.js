// utils/getCategoryColor.js
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

export const getCategoryColor = (categoryId) => {
  return colorSchemes[categoryId % colorSchemes.length] || "gray";
};
