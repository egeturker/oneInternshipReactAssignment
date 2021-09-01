import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core";
import Shop from "./pages/Shop";
import { CssBaseline } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  palette: {
    primary: {
      main: "#1EA4CE",
    },
    secondary: {
      main: "#1EA4CE",
    },
    background: {
      default: "#E5E5E5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Shop />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
