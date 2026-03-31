import { FormControl, InputLabel, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { ReactNode } from "react";

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent) => void;
  children: ReactNode;
  flex?: number;
}

const CustomSelect = ({ label, value, onChange, children, flex = 1 }: CustomSelectProps) => {
  return (
    <FormControl sx={{ flex }}>
      <InputLabel
        sx={{
          color: "#9CA3AF",
          transform: "translate(14px, 9px) scale(1)",
          "&.Mui-focused": { color: "rgba(255, 255, 255, 0.7)" },
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px, -9px) scale(0.75)",
          },
        }}
      >
        {label}
      </InputLabel>

      <Select
        value={value}
        label={label}
        onChange={onChange}
        sx={{
          color: "white",
          height: 40,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.23)",
            borderWidth: "2px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255,255,255,0.87)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#90CAF9",
            borderWidth: "2px",
          },
          "& .MuiSvgIcon-root": {
            color: "rgba(255,255,255,0.7)",
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;