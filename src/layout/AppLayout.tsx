import { Box, Container, Toolbar, useTheme, alpha, Paper } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function AppLayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: alpha(theme.palette.background.default, 0.9),
        backgroundImage: `linear-gradient(to bottom right, ${alpha(
          theme.palette.primary.main,
          0.02
        )}, transparent)`,
      }}
    >
      {/* Fixed Header */}
      <Header onToggleSidebar={handleToggleSidebar} />

      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - 260px)` }, // Account for sidebar width
          display: "flex",
          flexDirection: "column",
          transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {/* Toolbar spacer for fixed header */}
        <Toolbar />

        {/* Page content */}
        <Container
          maxWidth="lg"
          sx={{
            flexGrow: 1,
            py: { xs: 2, sm: 3 },
            px: { xs: 1, sm: 2, md: 3 },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              backgroundColor: theme.palette.background.paper,
              backgroundImage: `linear-gradient(to bottom, ${alpha(
                theme.palette.common.white,
                0.05
              )}, transparent)`,
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(to right, ${
                  theme.palette.primary.main
                }, ${alpha(theme.palette.primary.light, 0.7)})`,
              },
            }}
          >
            <Outlet />
          </Paper>
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}
