import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  blogs: {
    border: '1px solid #2d2553',
    padding: '0',
    margin: '1rem 0 0 0',
  },
  blogItem: {
    padding: '1rem',
    background: '#130e3a',
    '&:nth-of-type(2n)': {
      background: '#100723',
    },
    '&:hover': {
      background: 'linear-gradient(90deg, #281B78FF 2%, #130e3a 100%)',
    },
    '& a': {
      color: '#c7c3d2',
    },
  },
});

const User = () => {
  const classes = useStyles();

  const { id } = useParams();

  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <Typography component="h2" variant="h4">
        {user.name}
      </Typography>
      <Typography component="h3" variant="h5">
        added blogs
      </Typography>
      <List className={classes.blogs}>
        {user.blogs.map((blog) => (
          <ListItem
            key={blog.id}
            className={classes.blogItem}
            data-testid="user-blog"
          >
            {blog.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default User;
