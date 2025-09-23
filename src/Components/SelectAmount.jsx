import React from "react";
import { useBooking } from "../Contexts/BookingContext";

const SelectAmount = () => {
  const { amount, setAmount } = useBooking();

  return (
    <div>
      <h3>Select Amount</h3>
      <input
        type="number"
        min="1"
        max="20"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
      />
    </div>
  );
};

export default SelectAmount;
