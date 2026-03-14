import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";

interface SolarDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  flex?: number;
}

const SolarDatePicker = ({ label, value, onChange, flex = 1 }: SolarDatePickerProps) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          size: "small",
          sx: {
            flex,
            height: 45,

            "& input": {
              color: "white",
              WebkitTextFillColor: "white",
            },

            "& .MuiInputLabel-root": {
              color: "white",
              "&.Mui-focused": { color: "white" },
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
        },
      }}
    />
  );
};

export default SolarDatePicker;