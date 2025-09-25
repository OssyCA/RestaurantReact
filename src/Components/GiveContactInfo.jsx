import { useReducer, useState } from "react";
import { useBooking } from "../Contexts/BookingContext";
import { validateForm } from "../Services/ValideteContactForm";

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
        errors: { ...state.errors, [action.field]: null }, // Clear error when typing
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
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          required
          value={bookingInfo.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        {bookingInfo.errors.name && <span>{bookingInfo.errors.name}</span>}
      </div>
      <br />

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={bookingInfo.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        {bookingInfo.errors.email && <span>{bookingInfo.errors.email}</span>}
      </div>
      <br />

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter your phone number"
          required
          value={bookingInfo.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
        {bookingInfo.errors.phone && <span>{bookingInfo.errors.phone}</span>}
      </div>
      <br />

      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <button
        onClick={() => {
          handleUpdate();
          tempValidate();
        }}
      >
        Update
      </button>
    </div>
  );
};

export default GiveContactInfo;
