import { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [table, setTable] = useState({ tableId: null });
  const [amount, setAmount] = useState(0);

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <BookingContext.Provider
      value={{
        selectedDateTime,
        setSelectedDateTime,
        bookingData,
        updateBookingData,
        table,
        setTable,
        amount,
        setAmount,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
