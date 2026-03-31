import { createTheme } from '@mui/material/styles';

// Defining your branding colors
const ACCENT_AMBER = "#F59E0B";
const INPUT_BG = "#0D121F";

const theme = createTheme({
   typography: {
      fontFamily: "Inter",
   },
   palette: {
      mode: "dark",
      primary: {
         main: ACCENT_AMBER, // Sets the primary color for buttons and highlights
      },
      text: {
         primary: "#ffffff",
         secondary: "#9CA3AF", // Muted grey for placeholders/secondary text
      },
      background: {
         default: "#121212",
         paper: "#1B2535", // Slightly lighter navy for Dialogs/Cards
      },
   },
   components: {
      MuiTypography: {
         styleOverrides: {
            root: { fontFamily: "Inter" },
            h1: { fontWeight: 700 },
            h2: { fontWeight: 700 },
            h3: { fontWeight: 600 },
            h4: { fontWeight: 600 },
            h5: { fontWeight: 600 },
            h6: { fontWeight: 600 },
         },
      },
      MuiButton: {
         styleOverrides: {
            root: {
               textTransform: "none",
               borderRadius: "8px",
               fontWeight: 600,
            },
            containedPrimary: {
               color: "#000000", // Dark text on the Amber button for readability
               "&:hover": {
                  backgroundColor: "#D97706", // Deeper gold on hover
               },
            },
         },
      },
      MuiOutlinedInput: {
         styleOverrides: {
            root: {
               backgroundColor: INPUT_BG,
               borderRadius: "8px",

               // 🔥 THIS is what you're missing
               "&:hover": {
                  backgroundColor: INPUT_BG, // kill white hover overlay
               },

               "&.Mui-focused": {
                  backgroundColor: INPUT_BG, // keep consistent
               },

               "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.2)",
               },

               "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.4)",
               },

               "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: ACCENT_AMBER,
                  borderWidth: "2px",
               },
            },

            input: {
               color: "white",
               WebkitTextFillColor: "white",
               "&::placeholder": {
                  color: "#9CA3AF",
                  opacity: 1,
               },
            },
         },
      },
      MuiInputBase: {
         styleOverrides: {
            root: {
               "&:hover": {
                  backgroundColor: INPUT_BG,
               },
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            root: {
               color: "#9CA3AF", // Muted label when not focused
               "&.Mui-focused": {
                  color: ACCENT_AMBER, // Amber label when focused
               },
            },
         },
      },
      MuiSvgIcon: {
         styleOverrides: {
            root: {
               color: "inherit", // Allows icons to inherit text or primary color
            },
         },
      },
   },
});

export default theme;