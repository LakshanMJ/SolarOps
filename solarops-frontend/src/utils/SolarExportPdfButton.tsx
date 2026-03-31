import { Button } from "@mui/material";

const SolarExportPdfButton = ({ onClick }: { onClick: () => void }) => {

    const exportButtonStyle = {
        borderRadius: '8px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 20px',
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(245, 158, 11, 0.05)', // Very faint amber tint
        color: '#F59E0B',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        '&:hover': {
            backgroundColor: '#F59E0B',
            color: '#000', // Text turns black for contrast
            borderColor: '#F59E0B',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)', // Soft glow
            transform: 'translateY(-1px)', // Subtle lift
        },
    };

    return (
        <Button
            variant="outlined"
            sx={{ ...exportButtonStyle, color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', backgroundColor: 'rgba(239, 68, 68, 0.05)', '&:hover': { backgroundColor: '#ef4444', color: '#fff', borderColor: '#ef4444', boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)' } }}
            startIcon={<img src="/pdf.png" style={{ width: 18 }} />}
            onClick={onClick}
        >
            Export PDF
        </Button>
    )
}

export default SolarExportPdfButton;