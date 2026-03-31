import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";

// Use the same branding constants from your theme
const ACCENT_AMBER = "#F59E0B";
const INPUT_BG = "#0D121F";

interface SolarDatePickerProps {
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
    flex?: number;
    size?: "small" | "medium"; // 👈 add this
    [key: string]: any;
}

const SolarDatePicker = ({ label, value, onChange, flex = 1, size = "small", ...props }: SolarDatePickerProps) => {
    return (
        <DatePicker
            label={label}
            value={value}
            onChange={onChange}
            {...props} // Spreads any extra props like 'disabled' or 'minDate'
            slotProps={{
                textField: {
                    size,
                    fullWidth: true,
                    InputProps: {
                        sx: {
                            height: size === "small" ? "40px" : "56px",
                            backgroundColor: INPUT_BG,

                            "&:hover": {
                                backgroundColor: INPUT_BG, // 🔥 kills white hover
                            },

                            "&.Mui-focused": {
                                backgroundColor: INPUT_BG,
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255,255,255,0.2)",
                            },

                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255,255,255,0.4)",
                            },

                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: ACCENT_AMBER,
                                borderWidth: "2px",
                            },

                            "& input": {
                                color: "white",
                                WebkitTextFillColor: "white",
                            },

                            "& .MuiSvgIcon-root": {
                                color: "#9CA3AF",
                            }
                        }
                    },
                    sx: {
                        flex,
                        borderRadius: "8px",

                        "& .MuiInputLabel-root": {
                            color: "#9CA3AF",
                            "&.Mui-focused": {
                                color: ACCENT_AMBER,
                            },
                        }
                    }
                },

                desktopPaper: {
                    sx: {
                        backgroundColor: "#1B2535",
                        color: "white",
                        "& .MuiPickersDay-today": {
                            borderColor: ACCENT_AMBER,
                        },
                        "& .MuiPickersDay-root.Mui-selected": {
                            backgroundColor: ACCENT_AMBER,
                            color: "black",
                            "&:hover": { backgroundColor: "#D97706" }
                        }
                    }
                }
            }}
        />
    );
};

export default SolarDatePicker;