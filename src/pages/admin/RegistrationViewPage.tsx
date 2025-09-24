import { Box, Typography } from "@mui/material";
import TabsNavigation from "@/components/common/TabsNavigation";
import SubjectRegistrationsTable from "@/components/admin/SubjectRegistrationsTable";
import MentorRegistrationsTable from "@/components/admin/MentorRegistrationsTable";
import { useState } from "react";

const RegistrationViewPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      label: "Subject Registrations",
      content: <SubjectRegistrationsTable />,
    },
    {
      label: "Mentor Registrations",
      content: <MentorRegistrationsTable />,
    },
  ];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" component="h1">
          Registration Management
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        <TabsNavigation
          tabs={tabs}
          initialTab={activeTab}
          onChange={(index) => setActiveTab(index)}
        />
      </Box>
    </Box>
  );
};

export default RegistrationViewPage;
