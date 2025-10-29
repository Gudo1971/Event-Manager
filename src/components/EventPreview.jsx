// src/components/EventPreview.jsx
export const EventPreview = ({ event, categories }) => {
  if (!event) return null;

  const categoryNames = Array.isArray(event.categoryIds)
    ? categories
        .filter((cat) => event.categoryIds.includes(cat.id))
        .map((cat) => cat.name)
        .join(", ")
    : "no category";

  return (
    <>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />
      <p>
        {event.startTime} – {event.endTime}
      </p>
      <p>Categorieën: {categoryNames}</p>
    </>
  );
};
