import { useTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TimezoneSelect, { type ITimezoneOption } from 'react-timezone-select';
import { type DropdownIndicatorProps } from 'react-select';
import { components } from 'react-select';

interface Props {
    value: string | ITimezoneOption;
    onChange: (tz: ITimezoneOption) => void;
    label?: string;
}

const SolarTimezoneSelect = ({ value, onChange, label }: Props) => {
    const theme = useTheme();

    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            backgroundColor: "#0D121F",
            borderRadius: "8px",
            minHeight: "56px",
            borderWidth: state.isFocused ? "2px" : "1px",
            borderColor: state.isFocused
                ? theme.palette.primary.main
                : "rgba(255, 255, 255, 0.2)",
            boxShadow: "none",

            "&:hover": {
                backgroundColor: "#0D121F",
                borderColor: state.isFocused
                    ? theme.palette.primary.main
                    : "rgba(255, 255, 255, 0.4)",
            },
        }),

        valueContainer: (base: any) => ({
            ...base,
            padding: "0 14px",
        }),

        singleValue: (base: any) => ({
            ...base,
            color: "#ffffff",
            fontFamily: theme.typography.fontFamily,
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        dropdownIndicator: (base: any) => ({
            ...base,
            color: "#ffffff",
            paddingRight: "1px",
        }),
        menuPortal: (base: any) => ({
            ...base,
            zIndex: 9999,
        }),

        menu: (base: any) => ({
            ...base,
            backgroundColor: "#1B2535",
            borderRadius: "8px",
            marginTop: "6px",
            overflow: "hidden",
            zIndex: 9999,
        }),
        placeholder: (base: any) => ({
            ...base,
            color: "#9CA3AF",
            fontFamily: theme.typography.fontFamily,
        }),
        input: (base: any) => ({
            ...base,
            color: "#ffffff",
            fontFamily: theme.typography.fontFamily,
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? "#F59E0B"
                : state.isFocused
                    ? "#2A3548"
                    : "#1B2535",
            color: state.isSelected ? "#000000" : "#ffffff",
            cursor: "pointer",
            fontFamily: theme.typography.fontFamily,
        }),
        menuList: (base: any) => ({
            ...base,
            padding: 0,
            fontFamily: theme.typography.fontFamily,
        }),
    };

    const DropdownIndicator = (props: DropdownIndicatorProps<any>) => {
        return (
            <components.DropdownIndicator {...props}>
                <ArrowDropDownIcon sx={{ color: 'white', mr: 1 }} />
            </components.DropdownIndicator>
        );
    };

    return (
        <div style={{ width: '100%' }}>
            {label && (
                <label style={{
                    color: "#9CA3AF",
                    fontSize: "0.75rem",
                    marginBottom: "4px",
                    display: "block"
                }}>
                    {label}
                </label>
            )}
            <TimezoneSelect
                value={value}
                onChange={onChange}
                styles={customStyles}
                components={{ DropdownIndicator }}
                placeholder={label || "Time Zone"}
                menuPortalTarget={document.body}
                menuPosition="fixed"
            />
        </div>
    );
};

export default SolarTimezoneSelect;