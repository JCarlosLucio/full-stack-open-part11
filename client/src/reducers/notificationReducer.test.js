import notificationReducer from './notificationReducer';
import deepFreeze from 'deep-freeze';

describe('notificationReducer', () => {
  const initialState = {
    message: 'initial notification state',
  };
  test('should set notification state', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      notification: { alert: 'success', message: 'this is a notification' },
    };
    const state = initialState;
    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(action.notification);
  });

  test('should clear notification state', () => {
    const action = {
      type: 'CLEAR_NOTIFICATION',
    };
    const state = initialState;
    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toBe(null);
  });
});
