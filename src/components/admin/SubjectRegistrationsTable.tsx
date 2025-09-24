import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import Popup from "@/components/common/Popup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/utils/formatters";
import { useSubjectRegistrationsTable } from "@/hooks/admin/useSubjectRegistrationsTable";

const SubjectRegistrationsTable = () => {
  const {
    // State
    registrations,
    loading,
    totalRegistrations,
    page,
    pageSize,
    sortModel,
    viewDialogOpen,
    viewRegistration,
    viewLoading,

    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleViewClick,
    handleViewClose,
  } = useSubjectRegistrationsTable();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "menteeFullName", headerName: "Mentee", flex: 1 },
    { field: "subjectName", headerName: "Subject", flex: 1 },
    {
      field: "startDate",
      headerName: "Start Date",
      width: 120,
      renderCell: (params) => (params.value ? formatDate(params.value) : "—"),
    },
    {
      field: "endDate",
      headerName: "End Date",
      width: 120,
      renderCell: (params) => (params.value ? formatDate(params.value) : "—"),
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
      width: 100,
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
        </Stack>
      ),
    },
  ];

  return (
    <>
      <Stack spacing={3}>
        <Box sx={{ mb: 3, width: { xs: "100%", sm: "350px" } }}>
          <SearchBar
            placeholder="Search subject registrations..."
            onSearch={handleSearch}
            debounceMs={500}
          />
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataTable
            rows={registrations}
            columns={columns}
            rowId={(row) => row.id}
            loading={loading}
            pagination={{
              page,
              pageSize,
              rowCount: totalRegistrations,
              onChange: handlePaginationChange,
            }}
            sorting={{
              sortModel,
              onChange: handleSortChange,
            }}
          />
        </Box>
      </Stack>

      {/* Registration Details Dialog */}
      <Popup
        open={viewDialogOpen}
        onClose={handleViewClose}
        title="Subject Registration Details"
        maxWidth="md"
      >
        {viewLoading ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography>Loading registration details...</Typography>
          </Box>
        ) : (
          viewRegistration && (
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
                  Mentee
                </Typography>
                <Typography variant="body1">
                  {viewRegistration.menteeFullName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Subject
                </Typography>
                <Typography variant="body1">
                  {viewRegistration.subjectName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Start Date
                </Typography>
                <Typography variant="body1">
                  {viewRegistration.startDate
                    ? formatDate(viewRegistration.startDate)
                    : "—"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  End Date
                </Typography>
                <Typography variant="body1">
                  {viewRegistration.endDate
                    ? formatDate(viewRegistration.endDate)
                    : "—"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Created At
                </Typography>
                <Typography variant="body1">
                  {formatDate(viewRegistration.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Updated At
                </Typography>
                <Typography variant="body1">
                  {formatDate(viewRegistration.updatedAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Registration ID
                </Typography>
                <Chip label={`#${viewRegistration.id}`} size="small" />
              </Box>
            </Box>
          )
        )}
      </Popup>
    </>
  );
};

export default SubjectRegistrationsTable;
