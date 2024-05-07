import { createTheme } from "@mui/material";
import { colors } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: colors.red.A400,
    },
  },
  typography: {
    h1: {
      fontSize: "4.5rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.074rem",
    },
    h4: {
      fontSize: "1.728rem",
    },
    h5: {
      fontSize: "1.44rem",
    },
    h6: {
      fontSize: "1.2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
