export const ensureCategoryExists = async (name) => {
  const trimmedName = name.trim().toLowerCase();

  // 1. Haal bestaande categorieën op
  const res = await fetch("http://localhost:3000/categories");
  const categories = await res.json();

  // 2. Zoek of de naam al bestaat
  const existing = categories.find(
    (cat) => cat.name.trim().toLowerCase() === trimmedName
  );
  if (existing) return existing.id;

  // 3. Bepaal hoogste ID en maak nieuwe
  const maxId = Math.max(...categories.map((cat) => cat.id));
  const newCategory = {
    name: name.trim(),
    id: maxId + 1,
  };

  // 4. Voeg toe aan backend
  await fetch("http://localhost:3000/categories", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newCategory),
  });

  return newCategory.id;
};
