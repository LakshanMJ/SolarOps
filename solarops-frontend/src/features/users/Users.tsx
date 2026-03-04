import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "@/utils/fetch";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const users = () => {
    const [usersData, setUsersData] = useState([])
    const [tabValue, setTabValue] = useState('1');

    const columns: GridColDef[] = [
        {
            field: 'severity',
            headerName: 'Severity',
            width: 130, // slightly wider for Chip
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={severityColor[params.value as keyof typeof severityColor]}
                    size="small"
                />
            ),
        },
        {
            field: 'message',
            headerName: 'Message',
            flex: 2, // take more space for long messages
            minWidth: 200,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'inverter',
            headerName: 'Inverter',
            flex: 1.2,
            minWidth: 120,
            align: 'left',
            headerAlign: 'left',
            valueGetter: (_, row) => row.inverter?.name,
        },
        {
            field: 'site',
            headerName: 'Site',
            flex: 1.5,
            minWidth: 140,
            align: 'left',
            headerAlign: 'left',
            valueGetter: (_, row) => row.inverter?.site?.name,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1.2,
            minWidth: 150,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130, // fixed width works well for Chips
            align: 'left',
            headerAlign: 'left',
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={statusColor[params.value as keyof typeof statusColor]}
                    size="small"
                />
            ),
        },
        {
            field: 'maintenanceAction',
            headerName: 'Maintenance Actions',
            flex: 1.5,
            minWidth: 180,
            headerAlign: 'left',
        },
    ];

    const handleTabValueChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        async function fetchUsers() {
            try {
                const usersData = await fetchData(BACKEND_URLS.USERS);
                setUsersData(usersData);
            } catch (err) {
                console.error('Failed to load users data:', err);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <Box sx={{ height: 600, width: '100%', color: '#fff' }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#fff' }}>
                    Users and Roles
                </Typography>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabValueChange} aria-label="lab API tabs example">
                                <Tab label="Users" value="1" />
                                <Tab label="Roles" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                                <SolarDataGrid
                                    rows={usersData}
                                    columns={columns}
                                    pageSizeOptions={[5, 10]}
                                    rowsPerPageOptions={[5]}
                                    disableSelectionOnClick
                                    disableColumnSorting
                                    initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
                                    autoHeight
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">Roles</TabPanel>
                    </TabContext>
                </Box>

            </Box>
        </>
    );
}

export default users;