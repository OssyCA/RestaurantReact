import { useState } from "react";
import { getTables } from "../Services/BookingService";

const SelectTable = () => {
  const [tableList, setTableList] = useState([]);

  // CHANGE THIS TO DYNAMIC DATE LATER
  const tables = async () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    try {
      const data = await getTables(nextMonth, 4);
      setTableList(data);
    } catch (error) {
      console.error("Error fetching tables:", error);
      setTableList(["No tables available"]);
      console.log(tableList);
    }
  };

  return (
    <div>
      <button onClick={tables}>Load Tables</button>
      <ul>
        {/* FIXA SENARE */}
        {tableList.length === 0 ? (
          <div>NO SEATS AVAILABLE</div>
        ) : (
          tableList.map((table, index) => (
            <li key={index}>
              {table.tablenumber} - Seats: {table.capacity}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SelectTable;
