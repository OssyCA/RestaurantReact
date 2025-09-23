import React from "react";
import { useBooking } from "../Contexts/BookingContext";

export default function TempBookingInfo() {
  const { bookingData } = useBooking();
  const { selectedDateTime } = useBooking();
  const { table } = useBooking();
  const { amount } = useBooking();

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
    </div>
  );
}
