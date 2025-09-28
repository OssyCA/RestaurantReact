import BookingSteps from "./Components/BookingSteps";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <header></header>
      <Navbar />
      <main>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />

          <BookingSteps />
        </ThemeProvider>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
