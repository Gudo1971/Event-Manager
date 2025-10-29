import { createContext, useContext, useState, useEffect } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/events");
    const data = await res.json();
    setEvents([...data]); // 🔥 forceer nieuwe referentie
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, fetchEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
