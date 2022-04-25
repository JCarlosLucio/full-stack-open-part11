import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import Notification from './components/Notification';
import User from './components/User';
import UserList from './components/UserList';
import Togglable from './components/Togglable';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser } from './reducers/loginReducer';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: '#100723',
    minHeight: '100vh',
    height: '100%',
    color: '#c7c3d2',
    paddingBottom: '1rem',
    '& h2': {
      margin: '0',
      padding: '1rem 0',
    },
  },
});

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, []);

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className={classes.root}>
      <Menu />
      <Container>
        <Typography component="h2" variant="h4">
          blog app
        </Typography>
        <Notification />

        <Switch>
          <Route path="/users/:id">
            <User />
          </Route>

          <Route path="/blogs/:id">
            <Blog />
          </Route>

          <Route path="/users">
            <UserList />
          </Route>

          <Route path="/">
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <BlogForm
                toggleForm={() => blogFormRef.current.toggleVisibility()}
              />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
