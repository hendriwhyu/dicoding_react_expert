import { describe, expect, it } from 'vitest';
import usersSlice from './slice';

/**
    test scenario for usersSlice (reducers)

    usersReducers function
    - should return the initial state when given by unknown action
    - should return the users when given by RECEIVE_USERS action
*/

describe('usersReducers function', () => {
  it('should return then initial state when given by unknown action', () => {
    // arrange
    const initalState = [];
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    // action
    const nextState = usersSlice(initalState, action);
    // assert
    expect(nextState).toEqual(initalState);
  });
  it('should return the users when given by RECEIVE_USERS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'users/receiveUsers',
      payload: [
        {
          id: 'user-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
      ],
    };
    // action
    const nextState = usersSlice(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload);
  });
});
