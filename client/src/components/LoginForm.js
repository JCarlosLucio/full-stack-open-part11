import React from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { login } from '../reducers/loginReducer';
import Notification from './Notification';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#100723',
    color: '#c7c3d2',
    minHeight: '100vh',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '18rem',
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
  loginBtn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '3rem',
    padding: '0 30px',
  },
});

const LoginForm = () => {
  const classes = useStyles();

  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(username.value, password.value));
    resetUsername();
    resetPassword();
  };

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h3" gutterBottom>
        log in to application
      </Typography>
      <Notification />
      <form className={classes.form} onSubmit={handleLogin}>
        <TextField
          className={classes.textField}
          InputProps={{
            className: classes.inputColor,
          }}
          InputLabelProps={{
            className: classes.inputLabelColor,
          }}
          variant="outlined"
          fullWidth
          id="username"
          name="username"
          label="username"
          {...username}
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
          fullWidth
          id="password"
          name="password"
          label="password"
          {...password}
        />
        <Button
          fullWidth
          className={classes.loginBtn}
          id="login-button"
          type="submit"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
