import { createContext, useContext, useEffect, useState } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();
    setEvents(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("http://localhost:3000/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        categories,
        refetchEvents: fetchEvents,
        refetchCategories: fetchCategories, // ✅ expose refetch
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
