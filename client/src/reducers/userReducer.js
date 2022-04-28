import userService from '../services/users';
import { setNotification } from './notificationReducer';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users;

    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({ type: 'INIT_USERS', users });
    } catch (error) {
      console.error(error);
      dispatch(
        setNotification({ alert: 'error', message: error.response.data.error })
      );
    }
  };
};

export default userReducer;
