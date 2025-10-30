export const EventDetail = ({ event, categories }) => {
  if (!event) return null;

  const categoryNames = Array.isArray(event.categoryIds)
    ? categories
        .filter((cat) => event.categoryIds.includes(cat.id))
        .map((cat) => cat.name)
        .join(", ")
    : "Geen categorie";

  return (
    <>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p>{event.startTime}</p>
      <p>{event.endTime}</p>

      <img src={event.image} alt={event.title} />
      <p>
        {event.startTime} - {event.endTime}
      </p>
      <p>{categoryNames}</p>
    </>
  );
};
