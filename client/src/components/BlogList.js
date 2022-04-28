import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
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

const BlogList = () => {
  const classes = useStyles();

  const blogs = useSelector((state) => state.blogs);

  return (
    <List className={classes.root}>
      {blogs.map((blog) => (
        <ListItem
          className={classes.blogItem}
          key={blog.id}
          button
          component={Link}
          to={`/blogs/${blog.id}`}
          data-testid="blog-item"
        >
          {blog.title} {blog.author}
        </ListItem>
      ))}
    </List>
  );
};

export default BlogList;
