import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CartWidget from "./CartWidget";
import UserWidget from "../user/UserWidget"

import { Box } from "@mui/system";
import SplitButton from "./SplitButton";

export default function NavListDrawer({ navLinks }) {
  return (
    <Box sx={{ width: 250 , color: "white" }}>
      <nav>
        <List sx={{ bgcolor: 'warning.light' }}>
          {navLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton component="a" href={item.path}>
                <ListItemText>{item.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          
          {/* Wrap CartWidget with a ListItem and set background color */}
          <ListItem sx={{ bgcolor: 'warning.light' }}>
            <SplitButton/>
            <CartWidget />
            <UserWidget/>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}
