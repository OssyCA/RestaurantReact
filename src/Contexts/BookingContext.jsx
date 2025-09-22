import { createContext, useState, useContext } from "react";

export const BookingContext = createContext({});

export const BookingProvider = ({ children }) => {
  const [selectedDateTime, setSelectedDateTime] = useState("");

  return (
    <BookingContext.Provider value={{ selectedDateTime, setSelectedDateTime }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
