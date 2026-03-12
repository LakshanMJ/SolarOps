import { createTheme } from '@mui/material/styles';

const   theme = createTheme({
  typography: {
    fontFamily: "Inter",
  },
  palette: {
    mode: "dark", // dark mode
    text: {
      primary: "#ffffff",   // selected date text becomes white
      secondary: "#aaa",    // optional
    },
    background: {
      default: "#121212",   // dark background
      paper: "#1e1e1e",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: { fontFamily: "Inter", fontWeight: 700 },
        h2: { fontFamily: "Inter", fontWeight: 700 },
        h3: { fontFamily: "Inter", fontWeight: 600 },
        h4: { fontFamily: "Inter", fontWeight: 600 },
        h5: { fontFamily: "Inter", fontWeight: 600 },
        h6: { fontFamily: "Inter", fontWeight: 600 },
      },
    },
    
     MuiInputBase: {
      styleOverrides: {
        root: {
          color: "white",
        },
        input: {
          color: "white",
          WebkitTextFillColor: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "white",
        },
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

export default theme;
