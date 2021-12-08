import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@mui/icons-material/Menu';
// import ModalDialog from './ModalDialog';

const useStyles = makeStyles(theme => ({
  menuButton: {
    padding: 2,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          E-Commerce Super Seguro
        </Typography>
        <Button color="inherit" onClick={handleOpen}>
          Login
        </Button>
      </Toolbar>
      {/* <ModalDialog open={open} handleClose={handleClose} /> */}
    </AppBar>
  );
};

export default Navbar;