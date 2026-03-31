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
import DeleteModal from "@/utils/deleteModal";
import UserDrawer from "./UserDrawer";
import CreateUpdateRoles from "./CreateUpdateRoles";

const users = () => {
	const [usersData, setUsersData] = useState([])
	const [rolesData, setRolesData] = useState([])
	const [tabValue, setTabValue] = useState('1');
	const [activeUserId, setActiveUserId] = useState<string | null>(null);
	const [userDeleteModal, setUserDeleteModal] = useState({
		show: false,
		id: null as string | null,
	});
	const [selectedUser, setSelectedUser] = useState<any>(null);
	const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

	const [activeRoleId, setActiveRoleId] = useState<string | null>(null);
	const [roleDeleteModal, setRoleDeleteModal] = useState({
		show: false,
		id: null as string | null,
	});

	const userColumns = useMemo<GridColDef[]>(() => [
		{
			field: 'userName',
			headerName: 'User',
			renderCell: (params) => (
				<Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
					<Typography>{params.value || 'N/A'}</Typography>
				</Box>
			),
			flex: 1
		},

		{
			field: 'email',
			headerName: 'Email',
			renderCell: (params) => (
				<Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
					<Typography>{params.value || 'N/A'}</Typography>
				</Box>
			),
			align: 'center',
			headerAlign: 'center',
			flex: 1
		},

		{
			field: 'roles',
			headerName: 'Roles',
			renderCell: (params) => {
				const rolesArray = params.value as { id: string; name: string }[] | undefined;
				const roleNames = rolesArray?.map((r) => r.name).join(', ');

				return (

					<Typography
						sx={{
							whiteSpace: 'normal',
							wordBreak: 'break-word',
							lineHeight: 1.2,
							textAlign: 'center',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '100%',
						}}
					>
						{roleNames || 'N/A'}
					</Typography>
				);
			},
			align: 'center',
			headerAlign: 'center',
			flex: 1.3,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			headerAlign: 'center',
			flex: 1,
			align: 'center',
			renderCell: (params) => (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
						gap: 1,
					}}
				>
					<IconButton
						size="small"
						onClick={() => {
							setSelectedUser(params.row);    // use drawerrrrr
							setSelectedRowIds([params.id as number]);
						}}
					>
						<VisibilityIcon sx={{ color: 'white' }} fontSize="small" />
					</IconButton>

					<IconButton
						size="small"
						onClick={() => {
							setActiveUserId(params.row.id);
						}}
					>
						<EditIcon sx={{ color: 'white' }} fontSize="small" />
					</IconButton>

					<IconButton
						size="small"
						onClick={() =>
							setUserDeleteModal({
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

	const roleColumns = useMemo<GridColDef[]>(() => [
		{
			field: 'name',
			headerName: 'Name',
			renderCell: (params) => (
				<Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
					<Typography>{params.value || 'N/A'}</Typography>
				</Box>
			),
			flex: 3
		},

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
						height: '100%',
						gap: 1,
					}}
				>
					<IconButton
						size="small"
						onClick={() => {
							setActiveRoleId(params.row.id);
						}}
					>
						<EditIcon sx={{ color: 'white' }} fontSize="small" />
					</IconButton>

					<IconButton
						size="small"
						onClick={() =>
							setRoleDeleteModal({
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

	const handleDeleteSites = async () => {
		if (!userDeleteModal.id) return;
		try {
			await fetchData(
				`${BACKEND_URLS.USERS}/${userDeleteModal.id}`,
				{ method: "DELETE" }
			);
			await fetchUsers();
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	const handleDeleteRoles = async () => {
		if (!roleDeleteModal.id) return;
		try {
			await fetchData(
				`${BACKEND_URLS.ROLES}/${roleDeleteModal.id}`,
				{ method: "DELETE" }
			);
			await fetchRoles();
		} catch (err) {
			console.error("Delete failed:", err);
		}
	};

	async function fetchUsers() {
		try {
			const usersData = await fetchData(BACKEND_URLS.USERS);
			setUsersData(usersData);
		} catch (err) {
			console.error('Failed to load users data:', err);
		}
	}

	async function fetchRoles() {
		try {
			const rolesData = await fetchData(BACKEND_URLS.ROLES);
			setRolesData(rolesData);
		} catch (err) {
			console.error('Failed to load roles data:', err);
		}
	}

	useEffect(() => {
		fetchUsers();
		fetchRoles();
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
							<TabList
								onChange={handleTabValueChange}
								aria-label="lab API tabs example"
								sx={{
									'& .MuiTab-root': {
										color: '#fff',
									},
									'& .Mui-selected': {
										color: '#f59e0b !important',
									},
									'& .MuiTabs-indicator': {
										backgroundColor: '#f59e0b',
									},
								}}
							>
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
									columns={userColumns}
									pageSizeOptions={[5, 10]}
									rowsPerPageOptions={[5]}
									selectionModel={selectedRowIds}
									disableSelectionOnClick
									disableColumnSorting
									initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
									autoHeight
									getRowHeight={() => 'auto'}
									sx={{
										'& .MuiDataGrid-cell': {
											display: 'flex',
											alignItems: 'center',
											py: 2,
										},
									}}
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
						<TabPanel value="2">
							<Box sx={{ height: 400, width: '100%', mt: 2 }}>
								<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
									<Button
										variant="contained"
										color="primary"
										sx={{ mb: 2 }}
										onClick={() => setActiveRoleId('new')}
									>
										Add Role
									</Button>
								</Box>
								<SolarDataGrid
									rows={rolesData}
									columns={roleColumns}
									pageSizeOptions={[5, 10]}
									rowsPerPageOptions={[5]}
									selectionModel={selectedRowIds}
									disableSelectionOnClick
									disableColumnSorting
									initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
									autoHeight
								/>
								{activeRoleId && (
									<CreateUpdateRoles
										open={activeRoleId !== null}
										roleId={activeRoleId}
										onClose={() => setActiveRoleId(null)}
										fetchRoles={fetchRoles}
									/>
								)}
							</Box>
						</TabPanel>
					</TabContext>
				</Box>
				<DeleteModal
					open={userDeleteModal.show}
					onClose={() =>
						setUserDeleteModal({
							...userDeleteModal,
							show: false,
						})
					}
					onConfirm={handleDeleteSites}
				/>
				<DeleteModal
					open={roleDeleteModal.show}
					onClose={() =>
						setRoleDeleteModal({
							...roleDeleteModal,
							show: false,
						})
					}
					onConfirm={handleDeleteRoles}
				/>
				<UserDrawer
					open={!!selectedUser}
					onClose={() => setSelectedUser(null)}
					user={selectedUser}
				/>
			</Box>
		</>
	);
}

export default users;