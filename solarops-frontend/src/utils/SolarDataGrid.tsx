import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { DataGridProps } from '@mui/x-data-grid';

const SolarDataGrid = (props: DataGridProps) => {

    return (
        <Box
            sx={{
                border: '1px solid #1c2430',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#334155',
            }}
        >
            <DataGrid
                {...props}
                sx={{

                    '& .MuiDataGrid-columnSeparator': {
                        backgroundColor: '#dbdbda',
                        width: '1px',
                        height: '100%',
                    },

                    '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                        display: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader .MuiDataGrid-sortIconButton': {
                        display: 'none !important',
                        width: 0,
                        height: 0,
                        padding: 0,
                        margin: 0,
                    },
                    '& .MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer > button:first-of-type': {
                        display: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                        paddingRight: 4,
                    },
                    '& .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon': {
                        display: 'none',
                    },

                    backgroundColor: '#334155',
                    color: '#d7dde5',
                    border: '1px solid #1c2430',
                    borderRadius: 2,
                    p: 2,

                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#334155 !important',
                        borderBottom: '1px solid #1f2a36',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#334155 !important',
                        paddingRight: '12px',
                        alignItems: 'center',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: '#e3e9f0',
                        fontWeight: 600,
                        whiteSpace: 'normal',
                        lineHeight: 1.2,
                        textAlign: 'center',
                    },

                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },

                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: 'rgba(255, 170, 0, 0.08)',
                    },
                    '& .MuiDataGrid-row.Mui-selected:hover': {
                        backgroundColor: 'rgba(255, 170, 0, 0.14)',
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'rgba(255, 170, 0, 0.14)',
                    },

                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: '#334155',
                        borderTop: '1px solid #1f2a36',
                        color: '#b8ccc8',
                    },

                    ...props.sx,
                }}
            />
        </Box>
    )
}

export default SolarDataGrid;