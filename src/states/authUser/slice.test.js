import { describe, expect, it } from 'vitest';
import authUserSlice from './slice';

/**
    test scenario for authUserSlice (reducers)

    authUserReducers function
    - should return the initial state when given by unknown action
    - should return authUser when given by SET_AUTH_USER action
    - should return authUser  when given by UNSET_USER action
*/

describe('authUserReducers function', () => {
  it('should return then initial state when given by unknown action', () => {
    const initialState = null;

    const action = {
      type: 'UNKNOWN_ACTION',
    };

    const nextState = authUserSlice(initialState, action);

    expect(nextState).toEqual(initialState);
  });
  it('should return authUser when given by SET_AUTH_USER action', () => {
    const initialState = null;

    const action = {
      type: 'authUser/setAuthUser',
      payload: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        email: 'dimas@dicoding.com',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
    };
    const nextState = authUserSlice(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
  it('should return authUser when given by UNSET_USER action', () => {
    const initialState = null;

    const actionAuth = {
      type: 'authUser/setAuthUser',
      payload: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        email: 'dimas@dicoding.com',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
    };
    const nextStateAuth = authUserSlice(initialState, actionAuth);

    expect(nextStateAuth).toEqual(actionAuth.payload);

    const actionUnsetAuth = {
      type: 'authUser/unsetAuthUser',
    };
    const nextStateUnsetAuth = authUserSlice(nextStateAuth, actionUnsetAuth);

    expect(nextStateUnsetAuth).toEqual(initialState);
  });
});
