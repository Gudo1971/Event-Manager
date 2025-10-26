export const EventDetail = ({ event, categories }) => {
  if (!event || !event.categoryIds) return null;
  const categoryNames = categories
    .filter((cat) => event.categoryIds.includes(cat.id))
    .map((cat) => cat.name)
    .join(", ");

  return (
    <>
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.title} />
      <p>
        {event.startTime} - {event.endTime}
      </p>

      <p>{categoryNames}</p>
    </>
  );
};
