import React, { useState } from "react";
import { useBooking } from "../Contexts/BookingContext";
import { createBooking } from "../Services/BookingService";

export default function TempBookingInfo() {
  const { bookingData } = useBooking();
  const { selectedDateTime } = useBooking();
  const { table } = useBooking();
  const { amount } = useBooking();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConformation] = useState("");

  const booking = {
    TableId: bookingData.tableId,
    CustomerEmail: bookingData.email,
    CustomerName: bookingData.name,
    CustomerPhone: bookingData.phone,
    numberOfPeople: amount,
    bookingTime: new Date(selectedDateTime).toISOString(),
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    console.log("Pressed");
    try {
      const data = await createBooking(booking);
      setLoading(true);
      setConformation(data);
    } catch (error) {
      console.error("Error creating booking: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="debug-info">
        <h3>Current Booking Info:</h3>
        <div>Name: {bookingData?.name}</div>
        <div>Email: {bookingData?.email}</div>
        <div>Phone: {bookingData?.phone}</div>
        <div>Selected time and date: {selectedDateTime}</div>
        <div>Selected Amount: {amount}</div>
        <div>Selected Table: {table?.tableNumber}</div>
      </div>
      <form action="post" onSubmit={handleCreateBooking}>
        <button type="submit">Create booking</button>
      </form>
    </div>
  );
}
