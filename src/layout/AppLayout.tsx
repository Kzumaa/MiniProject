import { Box, Container, Toolbar } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Fixed Header */}
      <Header />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }, // Account for sidebar width
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Toolbar spacer for fixed header */}
        <Toolbar />

        {/* Page content */}
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
          <Outlet />
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
}
