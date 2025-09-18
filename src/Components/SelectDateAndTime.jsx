import React, { useRef, useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function SelectDateAndTime() {
  const datePickerRef = useRef(null);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [showDateTime, setShowDateTime] = useState(false);

  useEffect(() => {
    const fp = flatpickr(datePickerRef.current, {
      enableTime: true,
      dateFormat: "Y-m-d H:i",
      time_24hr: true,
      minTime: "10:00",
      maxTime: "21:00",
      wrap: false,
      inline: false,
      onChange: function (selectedDates, dateStr) {
        setSelectedDateTime(dateStr);
      },
    });

    return () => fp.destroy();
  }, []);

  const handlePickDate = () => {
    setShowDateTime(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <input
          ref={datePickerRef}
          type="text"
          placeholder="Välj datum och tid..."
        />
        <button onClick={handlePickDate}>Pick date</button>
      </div>

      {showDateTime && selectedDateTime && (
        <div>Datepicked: {selectedDateTime}</div>
      )}
    </div>
  );
}
