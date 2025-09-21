import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { navByRole } from "./navConfig";
import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "@/providers/hooks/useAuth";

const drawerWidth = 240;

export default function Sidebar() {
  // const { role } = useAuth();
  const loc = useLocation();

  const items = navByRole["ADMIN"];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <List>
        {items.map((it) => (
          <ListItemButton
            key={it.to}
            component={Link}
            to={it.to}
            selected={loc.pathname === it.to}
          >
            <ListItemText primary={it.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
