import { useState } from "react";
import { getTables } from "../Services/BookingService";
import { useBooking } from "../Contexts/BookingContext";

const SelectTable = () => {
  const [tableList, setTableList] = useState([]);
  const [partySize, setPartySize] = useState(1); // Changed from 0 to 1
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedDateTime } = useBooking();
  const { setTable } = useBooking();
  const [selectedTable, setSelectedTable] = useState(null);
  const { amount } = useBooking();

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
    <div>
      <h3>Select Table</h3>
      <div>
        <label htmlFor="partysize">Amount: </label>
        <input
          type="number"
          id="partysize"
          name="partysize"
          value={partySize}
          onChange={(e) => setPartySize(parseInt(e.target.value) || 1)}
          min="1"
          max="20"
          placeholder="Enter party size"
        />
      </div>
      <button onClick={tables}>Load Tables</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {loading ? (
          <div>Loading...</div>
        ) : hasSearched && tableList.length === 0 ? (
          <div>NO SEATS AVAILABLE</div>
        ) : (
          tableList.map((table, index) => (
            <li key={index}>
              <button
                value={selectedTable}
                onClick={() =>
                  console.log("Selected Table:", table) ||
                  setSelectedTable(table) ||
                  setTable(table)
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
