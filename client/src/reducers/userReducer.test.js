import deepFreeze from 'deep-freeze';
import userReducer from './userReducer';

describe('userReducer', () => {
  const initialState = [];
  test('should return list of users', () => {
    const action = {
      type: 'INIT_USERS',
      users: [
        {
          blogs: [],
          username: 'yoshi',
          name: 'Yoshi',
          id: '1',
        },
      ],
    };
    const state = initialState;
    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toEqual(action.users);
  });
});
