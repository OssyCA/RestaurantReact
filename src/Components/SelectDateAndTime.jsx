import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useBooking } from "../Contexts/BookingContext";

export default function SelectDateAndTime() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateTime, setShowDateTime] = useState(false);
  const { setSelectedDateTime } = useBooking();

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
    if (newValue) {
      const formattedDate = newValue.format("YYYY-MM-DD HH:mm");
      setSelectedDateTime(formattedDate);
      setShowDateTime(true);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateTimePicker
          label="Välj datum och tid"
          value={selectedDate}
          onChange={handleDateChange}
          ampm={false}
          minTime={dayjs().hour(10).minute(0)}
          maxTime={dayjs().hour(21).minute(0)}
        />

        {showDateTime && selectedDate && (
          <div>Datepicked: {selectedDate.format("YYYY-MM-DD HH:mm")}</div>
        )}
      </div>
    </LocalizationProvider>
  );
}
