import SelectDateAndTime from "./Components/SelectDateAndTime";
import GiveContactInfo from "./Components/GiveContactInfo";
import SelectTable from "./Components/SelectTable";
import { BookingProvider } from "./Contexts/BookingContext";

const BookingSteps = () => {
  return (
    <BookingProvider>
      <div>
        <h2>Booking Steps</h2>
        <SelectDateAndTime />
        <SelectTable />
        <GiveContactInfo />
      </div>
    </BookingProvider>
  );
};

export default BookingSteps;
