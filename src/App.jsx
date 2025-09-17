import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import dayjs from "dayjs";

function App() {
  const [dateTime, setDateTime] = useState(null);
  const [showDateTime, setShowDateTime] = useState(false);

  const handlePickDate = () => {
    setShowDateTime(true);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Basic date time picker"
          value={dateTime}
          onChange={(newValue) => setDateTime(newValue)}
        />
        <button onClick={handlePickDate}>Pick date</button>
      </LocalizationProvider>
      {showDateTime && (
        <div>
          Datepicked:{" "}
          {dateTime ? dateTime.format("YYYY-MM-DD HH:mm") : "Inget datum valt"}
        </div>
      )}
    </div>
  );
}

export default App;
