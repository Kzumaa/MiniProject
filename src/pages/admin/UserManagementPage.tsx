import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Popup from "@/components/common/Popup";
import { useUsersTable } from "@/hooks/admin/useUsersTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/utils/formatters";

const UserManagementPage = () => {
  const {
    // State
    users,
    loading,
    totalUsers,
    page,
    pageSize,
    sortModel,
    deleteDialogOpen,
    deleteLoading,
    viewDialogOpen,
    viewUser,
    viewLoading,

    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleViewClick,
    handleViewClose,
  } = useUsersTable();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 180,
      renderCell: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => handleViewClick(params.row.id)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton
              size="small"
              onClick={() => console.log("Edit user", params.row.id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(params.row.id)}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack spacing={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            User Management
          </Typography>
          <Button variant="contained" color="primary">
            Add User
          </Button>
        </Box>

        <Box sx={{ mb: 3, width: { xs: "100%", sm: "350px" } }}>
          <SearchBar
            placeholder="Search users..."
            onSearch={handleSearch}
            debounceMs={500}
          />
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataTable
            rows={users}
            columns={columns}
            rowId={(row) => row.id}
            loading={loading}
            pagination={{
              page,
              pageSize,
              rowCount: totalUsers,
              onChange: handlePaginationChange,
            }}
            sorting={{
              sortModel,
              onChange: handleSortChange,
            }}
          />
        </Box>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        confirmText={deleteLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />

      {/* User Details Dialog */}
      <Popup
        open={viewDialogOpen}
        onClose={handleViewClose}
        title="User Details"
        maxWidth="md"
      >
        {viewLoading ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography>Loading user details...</Typography>
          </Box>
        ) : (
          viewUser && (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                py: 2,
              }}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Full Name
                </Typography>
                <Typography variant="body1">{viewUser.fullName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Username
                </Typography>
                <Typography variant="body1">{viewUser.username}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{viewUser.email}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Role
                </Typography>
                <Chip
                  label={viewUser.role}
                  color={
                    viewUser.role === "ADMIN"
                      ? "primary"
                      : viewUser.role === "MENTOR"
                      ? "success"
                      : "info"
                  }
                  size="small"
                />
              </Box>
              {viewUser.description && (
                <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {viewUser.description}
                  </Typography>
                </Box>
              )}
              {viewUser.assignedSubjects &&
                viewUser.assignedSubjects.length > 0 && (
                  <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Assigned Subjects
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {viewUser.assignedSubjects.map((subject) => (
                        <Chip
                          key={subject.id}
                          label={subject.name}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {formatDate(viewUser.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Updated At
                </Typography>
                <Typography variant="body1">
                  {formatDate(viewUser.updatedAt)}
                </Typography>
              </Box>
            </Box>
          )
        )}
      </Popup>
    </>
  );
};

export default UserManagementPage;
