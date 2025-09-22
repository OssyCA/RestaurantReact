import SelectDateAndTime from "./Components/SelectDateAndTime";
import GiveContactInfo from "./Components/GiveContactInfo";
import SelectTable from "./Components/SelectTable";
import { BookingProvider } from "./Contexts/BookingContext";

function App() {
  return (
    <>
      <BookingProvider>
        <SelectDateAndTime />
        <SelectTable />
        <GiveContactInfo />
        <button>Book</button>
      </BookingProvider>
    </>
  );
}

export default App;
