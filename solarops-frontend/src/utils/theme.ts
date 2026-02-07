import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Inter",
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
  },
});

export default theme;
