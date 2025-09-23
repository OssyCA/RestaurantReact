import SelectDateAndTime from "./SelectDateAndTime";
import GiveContactInfo from "./GiveContactInfo";
import SelectTable from "./SelectTable";
import { BookingProvider } from "../Contexts/BookingContext";
import TempBookingInfo from "./TempBookingInfo";

const BookingSteps = () => {
  return (
    <BookingProvider>
      <div>
        <h2>Booking Steps</h2>
        <GiveContactInfo />

        <SelectDateAndTime />
        <SelectTable />
        <hr />
        <TempBookingInfo />
      </div>
    </BookingProvider>
  );
};

export default BookingSteps;
