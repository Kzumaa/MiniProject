import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { useForm } from "react-hook-form";

// Import components to test
import DataTable from "@/components/common/DataTable";
import SearchBar from "@/components/common/SearchBar";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import RHFForm from "@/components/common/RHFForm";
import RHFTextField from "@/components/common/Fields/RHFTextField";
import RHFSelect from "@/components/common/Fields/RHFSelect";
import { useToast } from "@/providers/hooks/useToast";

// Mock data for DataTable
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "ADMIN",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "MENTEE",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "MENTOR",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "MENTEE",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    role: "MENTOR",
    status: "Active",
  },
];

const mockColumns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
];

type TestFormData = {
  username: string;
  email: string;
  role: string;
  description: string;
};

export default function ComponentTestPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const { show } = useToast();

  // Form setup
  const methods = useForm<TestFormData>({
    defaultValues: {
      username: "",
      email: "",
      role: "",
      description: "",
    },
  });

  // Role options for select
  const roleOptions = [
    { value: "ADMIN", label: "Admin" },
    { value: "MENTOR", label: "Mentor" },
    { value: "MENTEE", label: "Mentee" },
  ];

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredUsers(mockUsers);
    } else {
      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          user.role.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    show(`Search performed for: "${query}"`, "info");
  };

  // Form submission handler
  const handleFormSubmit = (data: TestFormData) => {
    console.log("Form submitted:", data);
    show(`Form submitted successfully! Username: ${data.username}`, "success");
    methods.reset();
  };

  // Confirm dialog handlers
  const handleConfirmAction = () => {
    show("Action confirmed!", "success");
    setConfirmOpen(false);
  };

  const handleCancelAction = () => {
    show("Action cancelled!", "info");
    setConfirmOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Component Test Page
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        This page showcases all common components with mock data for testing
        purposes.
      </Typography>

      <Stack spacing={4}>
        {/* SearchBar Component */}
        <Card>
          <CardHeader title="SearchBar Component" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Search functionality with enter key support and search icon.
            </Typography>
            <SearchBar defaultValue={searchQuery} onSearch={handleSearch} />
            {searchQuery && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Current search: "{searchQuery}"
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* DataTable Component */}
        <Card>
          <CardHeader title="DataTable Component" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Data grid with sorting, pagination, and search filtering.
            </Typography>
            <Box sx={{ height: 400, width: "100%" }}>
              <DataTable
                rows={filteredUsers}
                columns={mockColumns}
                rowId={(row) => row.id}
                loading={false}
              />
            </Box>
          </CardContent>
        </Card>

        {/* RHF Form Components */}
        <Card>
          <CardHeader title="React Hook Form Components" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Form with validation using RHFTextField and RHFSelect components.
            </Typography>
            <RHFForm methods={methods} onSubmit={handleFormSubmit}>
              <Stack spacing={3}>
                <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
                  <RHFTextField
                    name="username"
                    label="Username"
                    placeholder="Enter username"
                  />
                  <RHFTextField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter email"
                  />
                </Stack>

                <RHFSelect name="role" label="Role" options={roleOptions} />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                  placeholder="Enter description (optional)"
                />

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button type="submit" variant="contained">
                    Submit Form
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => methods.reset()}
                  >
                    Reset Form
                  </Button>
                </Box>
              </Stack>
            </RHFForm>
          </CardContent>
        </Card>

        {/* ConfirmDialog Component */}
        <Card>
          <CardHeader title="ConfirmDialog Component" />
          <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Modal dialog for confirming actions with customizable messages.
            </Typography>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setConfirmOpen(true)}
            >
              Open Confirm Dialog
            </Button>
            <ConfirmDialog
              open={confirmOpen}
              title="Confirm Action"
              message="Are you sure you want to perform this action? This action cannot be undone."
              onConfirm={handleConfirmAction}
              onCancel={handleCancelAction}
              confirmText="Yes, Proceed"
              cancelText="Cancel"
            />
          </CardContent>
        </Card>

        {/* Component Summary */}
        <Paper sx={{ p: 3, bgcolor: "grey.50" }}>
          <Typography variant="h6" gutterBottom>
            Component Summary
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2">
              ✅ <strong>DataTable:</strong> Displays tabular data with sorting
              and pagination
            </Typography>
            <Typography variant="body2">
              ✅ <strong>SearchBar:</strong> Input field with search
              functionality
            </Typography>
            <Typography variant="body2">
              ✅ <strong>ConfirmDialog:</strong> Modal for confirming actions
            </Typography>
            <Typography variant="body2">
              ✅ <strong>RHFForm:</strong> Form wrapper with React Hook Form
              integration
            </Typography>
            <Typography variant="body2">
              ✅ <strong>RHFTextField:</strong> Text input with validation
            </Typography>
            <Typography variant="body2">
              ✅ <strong>RHFSelect:</strong> Dropdown select with validation
            </Typography>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
