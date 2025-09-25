import { useBooking } from "../Contexts/BookingContext";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const SelectAmount = () => {
  const { amount, setAmount } = useBooking();

  const handleAmountChange = (event) => {
    const value = event.target.value;
    setAmount(Math.max(1, Math.min(20, value)));
  };

  const amountOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Select Amount
      </Typography>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="amount-select-label">Number of People</InputLabel>
        <Select
          labelId="amount-select-label"
          id="amount-select"
          value={amount || 1}
          label="Number of People"
          onChange={handleAmountChange}
        >
          {amountOptions.map((num) => (
            <MenuItem key={num} value={num}>
              {num} {num === 1 ? "person" : "people"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectAmount;
