import SelectDateAndTime from "./Components/SelectDateAndTime";
import GiveContactInfo from "./Components/GiveContactInfo";
import SelectTable from "./Components/SelectTable";
import { BookingProvider } from "./Contexts/BookingContext";
function App() {
  return (
    <>
      <BookingProvider>
        <div>
          <h2>Booking Steps</h2>
          <GiveContactInfo />
          <SelectDateAndTime />
          <SelectTable />
        </div>
      </BookingProvider>
    </>
  );
}

export default App;
