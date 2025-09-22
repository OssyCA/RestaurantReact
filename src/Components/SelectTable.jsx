import { useState } from "react";
import { getTables } from "../Services/BookingService";
import { useBooking } from "../Contexts/BookingContext";

const SelectTable = () => {
  const [tableList, setTableList] = useState([]);
  const [partySize, setPartySize] = useState(1); // Changed from 0 to 1
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedDateTime } = useBooking();

  // Function to fetch available tables with error handling
  const tables = async () => {
    if (!selectedDateTime) {
      alert("choose a time and date");
      return;
    }

    if (partySize < 1) {
      alert("Please enter a valid party size");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    try {
      const selectedDate = new Date(selectedDateTime);
      const data = await getTables(selectedDate, partySize);
      setTableList(data);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTableList([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Select Table</h3>
      <div>
        <label htmlFor="partysize">Antal: </label>
        <input
          type="number"
          id="partysize"
          name="partysize"
          value={partySize}
          onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
          min="1"
          max="20"
          placeholder="Enter party size"
          style={{ margin: "10px", padding: "5px" }}
        />
      </div>
      <button
        onClick={tables}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          margin: "10px 0",
        }}
      >
        Load Tables
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {loading ? (
          <div style={{ padding: "10px", fontStyle: "italic" }}>Loading...</div>
        ) : hasSearched && tableList.length === 0 ? (
          <div style={{ padding: "10px", color: "red" }}>
            NO SEATS AVAILABLE
          </div>
        ) : (
          tableList.map((table, index) => (
            <li
              key={index}
              style={{
                margin: "5px 0",
                padding: "10px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
              }}
            >
              <button
                onClick={() =>
                  console.log(`Selected table ${table.tablenumber}`)
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Table {table.tablenumber} - Seats: {table.capacity}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SelectTable;
