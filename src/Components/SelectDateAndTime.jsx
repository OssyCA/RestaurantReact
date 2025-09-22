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
          label="Choose Date & Time"
          value={selectedDate}
          onChange={handleDateChange}
          ampm={false}
          disablePast={true}
          minTime={
            selectedDate
              ? selectedDate.hour(10).minute(0)
              : dayjs().hour(10).minute(0)
          }
          maxTime={
            selectedDate
              ? selectedDate.hour(21).minute(0)
              : dayjs().hour(21).minute(0)
          }
          shouldDisableTime={(value, view) => {
            const now = dayjs();
            if (view === "hours") {
              const hour = value.hour();
              if (hour < 10 || hour > 21) return true;
              if (value.isSame(now, "day") && hour <= now.hour()) {
                return true;
              }

              return false;
            }

            return false;
          }}
        />

        {showDateTime && selectedDate && (
          <div>Datepicked: {selectedDate.format("YYYY-MM-DD HH:mm")}</div>
        )}
      </div>
    </LocalizationProvider>
  );
}
