import blogService from '../services/blogs';
import loginService from '../services/login';
import storage from '../utils/storage';
import { setNotification } from './notificationReducer';

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => {
  return { type: 'SET_USER', user };
};

export const clearUser = () => {
  return { type: 'CLEAR_USER' };
};

export const initializeUser = () => {
  return (dispatch) => {
    const loggedUser = storage.loadUser();
    if (loggedUser) {
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  };
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      storage.saveUser(user);
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(
        setNotification({
          alert: 'success',
          message: `Welcome back, ${user.name}!`,
        })
      );
    } catch (error) {
      console.error(error.response.data.error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    storage.clearUser();
    blogService.setToken(null);
    dispatch(clearUser());
    dispatch(
      setNotification({
        alert: 'success',
        message: 'You have been logged out successfully',
      })
    );
  };
};

export default loginReducer;
