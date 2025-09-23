import { useState } from "react";
import { getTables } from "../Services/BookingService";
import { useBooking } from "../Contexts/BookingContext";

const SelectTable = () => {
  const [tableList, setTableList] = useState([]);
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

    if (amount < 1) {
      alert("Please enter a valid party size");
      return;
    }

    setHasSearched(true);
    setLoading(true);
    try {
      const selectedDate = new Date(selectedDateTime);
      const data = await getTables(selectedDate, amount);
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
