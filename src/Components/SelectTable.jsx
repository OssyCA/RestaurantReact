import { useState } from "react";
import { getTables } from "../Services/BookingService";
import { useBooking } from "../Contexts/BookingContext";

const SelectTable = () => {
  const [tableList, setTableList] = useState([]);
  const [partySize, setPartySize] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedDateTime } = useBooking();

  // Function to fetch available tables with error handling
  const tables = async () => {
    if (!selectedDateTime) {
      alert("choose a time and date");
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
      <label htmlFor="partysize">Antal</label>
      <input
        type="number"
        id="partysize"
        name="partysize"
        value={partySize}
        onChange={(e) => setPartySize(parseInt(e.target.value) || 0)}
        min="1"
        max="20"
        placeholder="Enter party size"
      />
      <button onClick={tables}>Load Tables</button>
      <ul>
        {loading ? (
          <div>Loading...</div>
        ) : hasSearched && tableList.length === 0 ? (
          <div>NO SEATS AVAILABLE</div>
        ) : (
          tableList.map((table, index) => (
            <li key={index}>
              <a href="">
                {table.tablenumber} Seats: {table.capacity}
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SelectTable;
