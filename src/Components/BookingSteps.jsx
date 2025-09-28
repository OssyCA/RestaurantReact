import { BookingProvider } from "../Contexts/BookingContext";
import BookingStepsContent from "./BookingStepsContent";

const BookingSteps = () => {
  return (
    <BookingProvider>
      <BookingStepsContent />
    </BookingProvider>
  );
};

export default BookingSteps;
