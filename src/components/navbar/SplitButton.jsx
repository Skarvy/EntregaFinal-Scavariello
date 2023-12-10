import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/client';

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [categories, setCategories] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchCategories = async () => {
      const productsCollection = collection(db, 'productos');
      const productsSnapshot = await getDocs(productsCollection);

      const uniqueCategories = new Set();
      productsSnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.categoria) {
          uniqueCategories.add(productData.categoria);
        }
      });

      // Convertir el conjunto a un array y ordenarlo alfabéticamente
      const sortedCategories = Array.from(uniqueCategories).sort();
      setCategories(sortedCategories);
    };

    fetchCategories();
  }, []);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    const selectedCategory = categories[index].toLowerCase();
    navigate(`/categorias/${selectedCategory}`);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="text"
        ref={anchorRef}
        aria-label="split button"
        style={{ color: 'white', border: 'none', paddingRight: 0 }}
      >
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{ color: 'white', border: 'none' }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        style={{ marginTop: 5 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList sx={{ bgcolor: 'warning.light', color: 'white', border: "none" }} id="split-button-menu" autoFocusItem>
                  {categories.map((category, index) => (
                    <MenuItem
                      key={category}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {category}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
