import BookingSteps from "./Components/BookingSteps";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <header></header>
        <Navbar />
        <main>
          <CssBaseline />
          <BookingSteps />
        </main>
        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </>
  );
}

export default App;
