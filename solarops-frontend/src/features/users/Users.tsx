import { BACKEND_URLS } from "@/backendUrls";
import { fetchData } from "@/utils/fetch";
import SolarDataGrid from "@/utils/SolarDataGrid";
import { Box, Button, IconButton, Tab, Tabs, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateUpdateUsers from "./CreateUpdateUsers";

const users = () => {
    const [usersData, setUsersData] = useState([])
    const [tabValue, setTabValue] = useState('1');
    const [activeUserId, setActiveUserId] = useState<string | null>(null);

    const columns = useMemo<GridColDef[]>(() => [
        { field: 'name', headerName: 'User', flex: 1 },

        { field: 'email', headerName: 'Email', align: 'center', headerAlign: 'center', flex: 1 },

        { field: 'role', headerName: 'Roles', align: 'center', headerAlign: 'center', flex: 1.3 },

        {
            field: 'actions',
            headerName: 'Actions',
            headerAlign: 'center',
            flex: 1,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <IconButton
                        size="small"
                        onClick={() => {
                            setSelectedInverter(params.row);
                            setSelectedRowIds([params.id as number]);
                        }}
                    >
                        <VisibilityIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() => {
                            setActiveInverterId(params.row.id);
                        }}
                    >
                        <EditIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>

                    <IconButton
                        size="small"
                        onClick={() =>
                            setInverterDeleteModal({
                                show: true,
                                id: params.row.id,
                            })
                        }
                    >
                        <DeleteIcon sx={{ color: 'white' }} fontSize="small" />
                    </IconButton>
                </Box>
            ),
            sortable: false,
            filterable: false,
        }
    ], []);

    const handleTabValueChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };


    async function fetchUsers() {
        try {
            const usersData = await fetchData(BACKEND_URLS.USERS);
            setUsersData(usersData);
        } catch (err) {
            console.error('Failed to load users data:', err);
        }
    }


    useEffect(() => {
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
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mb: 2 }}
                                        onClick={() => setActiveUserId('new')}
                                    >
                                        Add User
                                    </Button>
                                </Box>
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
                                {activeUserId && (
                                    <CreateUpdateUsers
                                        open={activeUserId !== null}
                                        userId={activeUserId}
                                        onClose={() => setActiveUserId(null)}
                                        fetchUsers={fetchUsers}
                                    />
                                )}
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