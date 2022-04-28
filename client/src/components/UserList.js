import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from '../reducers/userReducer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    borderColor: '#c7c3d2',
  },
  head: {
    backgroundColor: '#00000b',
    '& th': {
      color: '#c7c3d2',
    },
  },
  body: {
    backgroundColor: '#130e3a',
    '& a': {
      color: '#c7c3d2',
    },
    '& td': {
      color: '#c7c3d2',
    },
  },
  row: {
    border: 'none',
    '&:nth-of-type(odd)': {
      backgroundColor: '#100723',
    },
  },
});

const UserList = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h4">
        Users
      </Typography>
      <TableContainer component={Paper} data-testid="users-table">
        <Table>
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell align="left">Names</TableCell>
              <TableCell align="center">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.body}>
            {users.map((user) => (
              <TableRow key={user.id} className={classes.row}>
                <TableCell align="left">
                  <Link to={`/users/${user.id}`} data-testid="user-link">
                    {user.username}
                  </Link>
                </TableCell>
                <TableCell align="center">{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
