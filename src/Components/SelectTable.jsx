import { useState } from "react";
import { getTables } from "../Services/BookingService";
import { useBooking } from "../Contexts/BookingContext";
import {
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Alert,
  Box,
} from "@mui/material";

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

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setTable(table);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select Table
      </Typography>

      <Button variant="contained" onClick={tables} sx={{ mb: 3 }}>
        Load Available Tables
      </Button>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : hasSearched && tableList.length === 0 ? (
        <Alert severity="warning">
          No tables available for the selected time and party size
        </Alert>
      ) : (
        <List>
          {tableList.map((table, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => handleTableSelect(table)}
                selected={selectedTable?.tableId === table.tableId}
              >
                <ListItemText
                  primary={`Table ${table.tableNumber}`}
                  secondary={`Capacity: ${table.capacity} people`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SelectTable;
