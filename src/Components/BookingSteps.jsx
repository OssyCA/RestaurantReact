import SelectDateAndTime from "./SelectDateAndTime";
import GiveContactInfo from "./GiveContactInfo";
import SelectTable from "./SelectTable";
import { BookingProvider } from "../Contexts/BookingContext";
import TempBookingInfo from "./TempBookingInfo";
import SelectAmount from "./SelectAmount";
const BookingSteps = () => {
  const steps = [
    "Contact Information",
    "Select date and time",
    "Amount of People",
    "Conformation",
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
