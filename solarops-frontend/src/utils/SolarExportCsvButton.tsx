import { Button } from "@mui/material";

const SolarExportCsvButton = ({ onClick }: { onClick: () => void }) => {
    const exportButtonStyle = {
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 20px',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        color: '#F59E0B',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        '&:hover': {
            backgroundColor: '#F59E0B',
            color: '#000',
            borderColor: '#F59E0B',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
            transform: 'translateY(-1px)',
        },
    };
    
    return (
        <Button
            variant="outlined"
            sx={exportButtonStyle}
            startIcon={<img src="/public/csv.png" style={{ width: 18 }} />}
            onClick={onClick}

        >
            Export CSV
        </Button>
    )
}

export default SolarExportCsvButton;