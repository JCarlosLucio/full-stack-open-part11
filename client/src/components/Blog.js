import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeBlog, removeBlog } from '../reducers/blogReducer';
import { useHistory, useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Button, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  blog: {
    padding: 0,
    margin: '1rem 0 0 0',
    '& a': {
      color: '#c7c3d2',
    },
  },
  likeBtn: {
    background: 'linear-gradient(45deg, #4300FFFF 0%, #71A2FFFF 100%)',
    boxShadow: '0 3px 5px 2px #4300FF8F',
    color: 'white',
    height: '2rem',
    padding: '0 20px',
  },
  likes: {
    padding: '0 1rem 0 0',
  },
  likeSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  commentsSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    margin: '1rem 0',
    color: '#2d2553',
  },
});

const Blog = () => {
  const classes = useStyles();

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const user = useSelector((state) => state.user);

  if (!blog || !user) {
    return null;
  }

  const like = () => dispatch(likeBlog(blog));

  const remove = () => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    );
    if (result) {
      dispatch(removeBlog(blog));
      history.push('/');
    }
  };

  return (
    <div className={classes.blog} data-testid="blog">
      <div className="blog-title">
        <Typography component="h3" variant="h4" gutterBottom>
          {blog.title} {blog.author}
        </Typography>
      </div>
      <div className="blogDetails">
        <Typography
          href={blog.url}
          component="a"
          variant="subtitle1"
          gutterBottom
        >
          {blog.url}
        </Typography>
        <section className={classes.likeSection}>
          <Typography className={classes.likes} component="span" variant="h5">
            {blog.likes} likes
          </Typography>
          <Button
            className={classes.likeBtn}
            onClick={like}
            data-testid="like-btn"
          >
            like
          </Button>
        </section>
        <Typography component="p" variant="subtitle2" paragraph>
          added by {blog.user.name}
        </Typography>
        {user?.username === blog.user.username && (
          <div>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              className="remove-button"
              data-testid="remove-btn"
              onClick={remove}
            >
              remove
            </Button>
          </div>
        )}
        <hr className={classes.divider} />
        <section className={classes.commentsSection}>
          <Typography component="h3" variant="h5">
            comments
          </Typography>
          <CommentForm blog={blog} />
          <List component="ul">
            {blog.comments.map((comment) => (
              <ListItem key={comment.id} component="li" divider>
                {comment.content}
              </ListItem>
            ))}
          </List>
        </section>
      </div>
    </div>
  );
};

export default Blog;
