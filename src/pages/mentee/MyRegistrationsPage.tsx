import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import DataTable from "@/components/common/DataTable";
import { useMyRegistrations } from "@/hooks/mentee/useMyRegistrations"; 
import type { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "@/utils/formatters";

const MyRegistrationsPage = () => {
  const {
    registrations,
    loading,
    total,
    page, 
    pageSize,
    sortModel,
    handlePaginationChange,
    handleSortChange,
  } = useMyRegistrations();

  const columns: GridColDef[] = [
    { 
      field: "subject",
      headerName: "Subject",
      flex: 1,
      renderCell: (params) => params.row.subject?.name || '-'
    },
    {
      field: "createdAt",
      headerName: "Registration Date",
      width: 180,
      renderCell: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "status",
      headerName: "Status", 
      width: 130,
      renderCell: (params) => (
        params.row.mentorId ? 'Assigned to Mentor' : 'Pending'
      )
    },
  ];

  return (
    <Stack spacing={3}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" component="h1">
          My Registered Subjects
        </Typography>
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
            rowCount: total,
            onChange: handlePaginationChange,
          }}
          sorting={{
            sortModel,
            onChange: handleSortChange,
          }}
        />
      </Box>
    </Stack>
  );
};

export default MyRegistrationsPage;