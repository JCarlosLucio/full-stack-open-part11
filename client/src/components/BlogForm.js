import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { createBlog } from '../reducers/blogReducer';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: '1rem 0 0 0',
    width: '100%',
  },
  inputs: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '1rem 0',
    flexWrap: 'wrap',
  },
  textField: {
    margin: '0.5rem',
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
  createBtn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '3rem',
    padding: '0 30px',
  },
});

const BlogForm = ({ toggleForm }) => {
  const classes = useStyles();

  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetUrl, ...url } = useField('text');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    dispatch(createBlog(newBlog));
    resetTitle();
    resetAuthor();
    resetUrl();
    toggleForm();
  };

  return (
    <div className={classes.root}>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div className={classes.inputs}>
          <TextField
            className={classes.textField}
            InputProps={{
              className: classes.inputColor,
            }}
            InputLabelProps={{
              className: classes.inputLabelColor,
            }}
            variant="outlined"
            id="title"
            name="title"
            label="title"
            {...title}
          />
          <TextField
            className={classes.textField}
            InputProps={{
              className: classes.inputColor,
            }}
            InputLabelProps={{
              className: classes.inputLabelColor,
            }}
            variant="outlined"
            id="author"
            name="author"
            label="author"
            {...author}
          />
          <TextField
            className={classes.textField}
            InputProps={{
              className: classes.inputColor,
            }}
            InputLabelProps={{
              className: classes.inputLabelColor,
            }}
            variant="outlined"
            id="url"
            name="url"
            label="url"
            {...url}
          />
          <Button
            className={classes.createBtn}
            id="create-blog-button"
            type="submit"
          >
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default BlogForm;
