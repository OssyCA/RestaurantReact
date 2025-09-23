import React, { useState } from "react";
import { useBooking } from "../Contexts/BookingContext";
import { createBooking } from "../Services/BookingService";
import CircularProgress from "@mui/material/CircularProgress";

export default function TempBookingInfo() {
  const { bookingData } = useBooking();
  const { selectedDateTime } = useBooking();
  const { table } = useBooking();
  const { amount } = useBooking();
  const [loading, setLoading] = useState(false); // LÄGG TILL
  const [confirmation, setConfirmation] = useState(""); // LÄGG TILL
  const [error, setError] = useState(""); // LÄGG TIKKL

  const booking = {
    TableId: table.tableId,
    CustomerEmail: bookingData.email,
    CustomerName: bookingData.name,
    CustomerPhone: bookingData.phone,
    Amount: amount,
    StartAt: new Date(selectedDateTime).toISOString(),
  };

  const handleCreateBooking = async (e) => {
    setConfirmation("");
    setError("");
    setLoading(true);
    console.log(booking); // TA BORT SEN
    e.preventDefault();
    try {
      console.log(booking);
      const data = await createBooking(booking);
      setConfirmation(data);
    } catch (error) {
      console.error("Error creating booking: ", error);
      setError("Failed to create booking. Please try again.");
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
