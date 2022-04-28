import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../reducers/loginReducer';
import { AppBar, Button, Container, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: '#00000b',
  },
  user: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '0',
    padding: '0.6rem 0',
  },
  logoutBtn: {
    margin: '0 0.6rem',
  },
});

const Menu = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  return (
    <AppBar className={classes.root} position="relative" data-testid="menu">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <Container className={classes.user} maxWidth="xl">
          {user.name} logged in
          <Button
            className={classes.logoutBtn}
            color="secondary"
            variant="outlined"
            size="small"
            onClick={() => dispatch(logout())}
          >
            logout
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
