// import { useAuth } from "@/providers/hooks/useAuth";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Avatar,
  useTheme,
  alpha,
  IconButton,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
}) {
  // const { user, logout } = useAuth();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
        backdropFilter: "blur(20px)",
        backgroundColor: alpha(theme.palette.primary.main, 0.95),
        boxShadow: `0 1px 10px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {onToggleSidebar && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onToggleSidebar}
              sx={{
                mr: 2,
                display: { sm: "none" },
                "&:hover": {
                  backgroundColor: alpha(theme.palette.common.white, 0.15),
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.05em",
              backgroundImage: `linear-gradient(90deg, ${alpha(
                theme.palette.common.white,
                0.95
              )}, ${alpha(theme.palette.common.white, 0.85)})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Mentor–Mentee Portal
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            color="inherit"
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.2),
              },
            }}
          >
            <NotificationsIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                border: `2px solid ${alpha(theme.palette.common.white, 0.7)}`,
                backgroundColor: alpha(theme.palette.primary.light, 0.8),
                color: theme.palette.common.white,
                fontWeight: 500,
                fontSize: "0.9rem",
              }}
            >
              AD
            </Avatar>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, lineHeight: 1.3 }}
              >
                Admin User
              </Typography>
              <Typography
                variant="caption"
                sx={{ opacity: 0.8, lineHeight: 1 }}
              >
                ADMIN
              </Typography>
            </Box>
            {/* Uncomment and modify when authentication is implemented
            {!!user && (
              <>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    border: `2px solid ${alpha(theme.palette.common.white, 0.7)}`,
                    backgroundColor: alpha(theme.palette.primary.light, 0.8),
                  }}
                >
                  {user.fullName.charAt(0)}
                </Avatar>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.3 }}>
                    {user.fullName}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8, lineHeight: 1 }}>
                    {user.role}
                  </Typography>
                </Box>
                <Button 
                  color="inherit" 
                  onClick={logout}
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: alpha(theme.palette.common.white, 0.3),
                    '&:hover': {
                      borderColor: alpha(theme.palette.common.white, 0.6),
                      backgroundColor: alpha(theme.palette.common.white, 0.1)
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )} */}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
