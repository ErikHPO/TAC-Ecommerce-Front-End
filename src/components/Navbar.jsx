import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import {Link, NavLink } from 'react-router-dom';


// import ModalDialog from './ModalDialog';

const useStyles = makeStyles(theme => ({
  menuButton: {
    padding: 2,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({username , isAdmin}) => {
  const classes = useStyles();
// console.log("navbar username:",username.signInUserSession.accessToken.jwtToken)
console.log('isadmin.',isAdmin);
  return (
    <AppBar position="static">
      <Toolbar>
      <NavLink to="/">
      <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
        >
          <AssuredWorkloadIcon/>
        </IconButton>
      </NavLink>
        
        <Typography variant="h6" className={classes.title}>
          E-Commerce Super Seguro
        </Typography>
        {isAdmin ? <Link to='/new'>
        <Button size="small" color="warning" variant="contained" sx={{ marginInline: '50px'}} >
          Novo produto
        </Button>
        </Link>: null }

        <Button color="inherit" onClick={() => console.log(username)}>
          {username.username}
        </Button>
        <AmplifySignOut buttonText="Logout" />
    
      </Toolbar>
      {/* <ModalDialog open={open} handleClose={handleClose} /> */}
    </AppBar>
  );
};

export default Navbar;