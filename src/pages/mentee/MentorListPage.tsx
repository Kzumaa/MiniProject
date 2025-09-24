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
import { useMentorsTable } from "@/hooks/mentee/useMentorsTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { GridColDef } from "@mui/x-data-grid";

const MentorListPage = () => {
  const {
    // State
    mentors,
    loading,
    totalMentors,
    page,
    pageSize,
    sortModel,
    viewDialogOpen,
    viewMentor,
    viewLoading,

    // Handlers
    handlePaginationChange,
    handleSortChange,
    handleSearch,
    handleViewClick,
    handleViewClose,
  } = useMentorsTable();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "fullName", headerName: "Full Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {params.row.description || "No description available"}
        </Typography>
      ),
    },
    {
      field: "assignedSubjects",
      headerName: "Subjects",
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.row.assignedSubjects?.length || 0} subjects
        </Typography>
      ),
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1">
            Available Mentors
          </Typography>
        </Box>

        <Box sx={{ mb: 3, width: { xs: "100%", sm: "350px" } }}>
          <SearchBar
            placeholder="Search mentors..."
            onSearch={handleSearch}
            debounceMs={500}
          />
        </Box>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataTable
            rows={mentors}
            columns={columns}
            rowId={(row) => row.id}
            loading={loading}
            pagination={{
              page,
              pageSize,
              rowCount: totalMentors,
              onChange: handlePaginationChange,
            }}
            sorting={{
              sortModel,
              onChange: handleSortChange,
            }}
          />
        </Box>
      </Stack>

      {/* Mentor Details Dialog */}
      <Popup
        open={viewDialogOpen}
        onClose={handleViewClose}
        title="Mentor Details"
        maxWidth="md"
      >
        {viewLoading ? (
          <Box sx={{ py: 4, textAlign: "center" }}>
            <Typography>Loading mentor details...</Typography>
          </Box>
        ) : (
          viewMentor && (
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
                <Typography variant="body1">{viewMentor.fullName}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{viewMentor.email}</Typography>
              </Box>
              {viewMentor.description && (
                <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {viewMentor.description}
                  </Typography>
                </Box>
              )}
              {viewMentor.assignedSubjects &&
                viewMentor.assignedSubjects.length > 0 && (
                  <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Assigned Subjects ({viewMentor.assignedSubjects.length})
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {viewMentor.assignedSubjects.map((subject) => (
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
            </Box>
          )
        )}
      </Popup>
    </>
  );
};

export default MentorListPage;
