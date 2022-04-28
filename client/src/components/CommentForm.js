import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { createComment } from '../reducers/blogReducer';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    margin: '0.5rem',
    // padding: '0.5rem',
    '& label.Mui-focused': {
      color: '#664FFFFF',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#664FFFFF',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#664FFFFF',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#8875FFFF',
      },
      '&:hover fieldset': {
        borderColor: '#664FFFFF',
        boxShadow: '0 1px 5px 2px #8874FF59',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#664FFFFF',
        boxShadow: '0 1px 5px 2px #8874FF59',
      },
    },
  },
  inputColor: {
    color: '#c7c3d2',
  },
  inputLabelColor: {
    color: '#8875FFFF',
  },
  commentBtn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '2.5rem',
    padding: '0 25px',
  },
});

const CommentForm = ({ blog }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { reset, ...content } = useField('text');

  const addComment = (event) => {
    event.preventDefault();
    dispatch(createComment(blog, content.value));
    reset();
  };

  return (
    <form className={classes.root} onSubmit={addComment}>
      <TextField
        className={classes.textField}
        InputProps={{
          className: classes.inputColor,
        }}
        InputLabelProps={{
          className: classes.inputLabelColor,
        }}
        variant="outlined"
        size="small"
        id="content"
        name="content"
        label="comment"
        {...content}
      />
      <Button
        className={classes.commentBtn}
        id="add-comment-button"
        type="submit"
      >
        add comment
      </Button>
    </form>
  );
};

CommentForm.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default CommentForm;
