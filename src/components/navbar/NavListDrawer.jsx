import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import CartWidget from "./CartWidget";
import UserWidget from "../user/UserWidget";
import SplitButton from "./SplitButton";

export default function NavListDrawer({ navLinks, onClose }) {
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    onClose(); // Llama a onClose para ocultar el Drawer
  };

  return (
    <Box sx={{ width: 250, color: "white" }}>
      <nav>
        <List sx={{ bgcolor: 'warning.light' }}>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton onClick={() => handleItemClick(item.path)}>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem sx={{ bgcolor: 'warning.light' }}>
            <SplitButton />
            <CartWidget />
            <UserWidget />
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
