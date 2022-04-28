const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return null;

    default:
      return state;
  }
};

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};

let timeoutId;
export const setNotification = (notification, seconds = 5) => {
  return (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', notification });
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationReducer;
