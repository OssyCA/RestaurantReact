import SelectDateAndTime from "./SelectDateAndTime";
import GiveContactInfo from "./GiveContactInfo";
import SelectTable from "./SelectTable";
import { BookingProvider } from "../Contexts/BookingContext";
import TempBookingInfo from "./TempBookingInfo";
import SelectAmount from "./SelectAmount";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const BookingSteps = () => {
  const steps = [
    "Contact Information",
    "Select date and time",
    "Amount of People",
    "",
  ];

  return (
    <BookingProvider>
      <div>
        <h2>Booking Steps</h2>
        <GiveContactInfo />
        <SelectDateAndTime />
        <SelectAmount />
        <SelectTable />
        <hr />
        <TempBookingInfo />
      </div>
    </BookingProvider>
  );
};

export default BookingSteps;
