import { useReducer } from "react";
import { useBooking } from "../Contexts/BookingContext";
import { validateForm } from "../Services/ValideteContactForm";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";

const initialState = {
  name: "",
  email: "",
  phone: "",
  errors: {},
  isValid: false,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      const newState = {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null },
      };
      return { ...newState, isValid: validateForm(newState) };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
        isValid: Object.keys(action.errors).length === 0,
      };

    case "VALIDATE":
      const errors = validateForm(state);
      return {
        ...state,
        errors,
        isValid: Object.keys(errors).length === 0,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};

const GiveContactInfo = () => {
  const [bookingInfo, dispatch] = useReducer(bookingReducer, initialState);
  const { updateBookingData } = useBooking();

  const handleInputChange = (field, value) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const tempValidate = () => {
    dispatch({ type: "VALIDATE" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleUpdate = () => {
    const { name, email, phone } = bookingInfo;
    updateBookingData({ name, email, phone });
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Contact Information
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          id="name"
          label="Name"
          variant="outlined"
          placeholder="Enter your name"
          required
          value={bookingInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={!!bookingInfo.errors.name}
          helperText={bookingInfo.errors.name}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          placeholder="Enter your email"
          required
          value={bookingInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={!!bookingInfo.errors.email}
          helperText={bookingInfo.errors.email}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          id="phone"
          label="Phone"
          type="tel"
          variant="outlined"
          placeholder="Enter your phone number"
          required
          value={bookingInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          error={!!bookingInfo.errors.phone}
          helperText={bookingInfo.errors.phone}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            handleUpdate();
            tempValidate();
          }}
        >
          SET INFO
        </Button>
      </Box>
    </Box>
  );
};

export default GiveContactInfo;
