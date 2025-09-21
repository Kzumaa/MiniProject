// import { useAuth } from "@/providers/hooks/useAuth";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

export default function Header() {
  // const { user, logout } = useAuth();

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }} variant="h6">
          Mentor–Mentee Portal
        </Typography>
        <Box>
          {/* {!!user && (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                {user.fullName} ({user.role})
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )} */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
