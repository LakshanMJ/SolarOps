import { createTheme } from '@mui/material/styles';

const ACCENT_AMBER = "#F59E0B";
const INPUT_BG = "#0D121F";

const theme = createTheme({
    typography: {
        fontFamily: "Inter",
    },
    palette: {
        mode: "dark",
        primary: {
            main: ACCENT_AMBER,
        },
        text: {
            primary: "#ffffff",
            secondary: "#9CA3AF",
        },
        background: {
            default: "#121212",
            paper: "#1B2535",
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
                    color: "#000000",
                    "&:hover": {
                        backgroundColor: "#D97706",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: INPUT_BG,
                    borderRadius: "8px",

                    "&:hover": {
                        backgroundColor: INPUT_BG,
                    },

                    "&.Mui-focused": {
                        backgroundColor: INPUT_BG,
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
                    color: "#9CA3AF",
                    "&.Mui-focused": {
                        color: ACCENT_AMBER,
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: "inherit",
                },
            },
        },
    },
});

export default theme;