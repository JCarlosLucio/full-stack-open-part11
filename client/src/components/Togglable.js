import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    padding: 0,
    margin: '1rem 0 0 0',
  },
  btn: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '3rem',
    padding: '0 30px',
  },
  visible: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Togglable = React.forwardRef(({ children, buttonLabel }, ref) => {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className={classes.btn} onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div className={classes.visible} style={showWhenVisible}>
        {children}
        <Button color="secondary" variant="outlined" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
