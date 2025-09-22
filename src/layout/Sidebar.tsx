import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
  useTheme,
  alpha,
  ListItemIcon,
  Divider,
  SwipeableDrawer,
  IconButton,
} from "@mui/material";
import { navByRole } from "./navConfig";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import BookIcon from "@mui/icons-material/Book";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CloseIcon from "@mui/icons-material/Close";
// import { useAuth } from "@/providers/hooks/useAuth";

const drawerWidth = 260;

// Add icons to navigation items based on label
const getNavIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "subjects":
      return <BookIcon fontSize="small" />;
    case "mentors":
      return <PersonIcon fontSize="small" />;
    case "assign":
      return <AssignmentIcon fontSize="small" />;
    case "registrations":
    case "my registrations":
      return <AssignmentIcon fontSize="small" />;
    default:
      return <HomeIcon fontSize="small" />;
  }
};

export default function Sidebar({
  mobileOpen = false,
  onClose,
}: {
  mobileOpen?: boolean;
  onClose?: () => void;
}) {
  // const { role } = useAuth();
  const loc = useLocation();
  const theme = useTheme();

  const items = navByRole["ADMIN"];

  const drawerContent = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.primary.main, 0.15),
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SchoolIcon color="primary" />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 600, letterSpacing: "0.02em" }}
          >
            Admin Portal
          </Typography>
        </Box>
        {onClose && (
          <IconButton
            onClick={onClose}
            sx={{
              display: { sm: "none" },
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Toolbar>

      <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.6) }} />

      <Box
        sx={{
          px: 1.5,
          py: 2,
          backgroundColor: theme.palette.background.paper,
          height: "100%",
        }}
      >
        <List
          sx={{
            "& .MuiListItemButton-root": {
              borderRadius: 1.5,
              mb: 0.5,
              py: 1,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
              "&.Mui-selected": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                },
                "& .MuiListItemIcon-root": {
                  color: theme.palette.primary.main,
                },
                "& .MuiTypography-root": {
                  fontWeight: 600,
                  color: theme.palette.primary.main,
                },
              },
            },
          }}
        >
          {items.map((it) => (
            <ListItemButton
              key={it.to}
              component={Link}
              to={it.to}
              selected={loc.pathname === it.to}
              sx={{
                transition: theme.transitions.create(
                  ["background-color", "box-shadow", "color"],
                  { duration: theme.transitions.duration.short }
                ),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color:
                    loc.pathname === it.to
                      ? theme.palette.primary.main
                      : alpha(theme.palette.text.primary, 0.7),
                }}
              >
                {it.icon || getNavIcon(it.label)}
              </ListItemIcon>
              <ListItemText
                primary={it.label}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: loc.pathname === it.to ? 600 : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile drawer */}
      <SwipeableDrawer
        variant="temporary"
        open={mobileOpen}
        onOpen={() => {}}
        onClose={() => onClose?.()}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundImage: `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              0.2
            )} 0%, ${alpha(theme.palette.background.paper, 0.1)} 100%)`,
            boxShadow: theme.shadows[5],
          },
        }}
      >
        {drawerContent}
      </SwipeableDrawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            backgroundColor: theme.palette.background.paper,
            backgroundImage: `linear-gradient(180deg, ${alpha(
              theme.palette.background.default,
              0.05
            )} 0%, ${alpha(theme.palette.background.paper, 0.05)} 100%)`,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
