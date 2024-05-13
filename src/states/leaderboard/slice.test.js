import { describe, expect, it } from 'vitest';
import leaderboardsSlice from './slice';
/**
    test scenario for leaderboardSlice (reducers)

    categoryReducers function
    - should return the initial state when given by unknown action
    - should return leaderboard when given by RECEIVE_LEADERBOARD action
*/

describe('leaderboardReducers function', () => {
  it('should return then initial state when given by unknown action', () => {
    // arrange
    const initalState = [];

    const action = {
      type: 'UNKNOWN_ACTION',
    };

    // action
    const nextState = leaderboardsSlice(initalState, action);

    // assert
    expect(nextState).toEqual(initalState);
  });
  it('should return category when given by RECEIVE_LEADERBOARD action', () => {
    // arrange
    const initialState = [];

    const action = {
      type: 'leaderboards/receiveLeaderboards',
      payload: [
        {
          user: {
            id: 'user-mQhLzINW_w5TxxYf',
            name: 'Dimas Saputra',
            email: 'dimas@dicoding.com',
            avatar:
              'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          score: 25,
        },
        {
          user: {
            id: 'user-djZpMcLxEkgW9sZC',
            name: 'another',
            email: 'another@gmail.com',
            avatar:
              'https://ui-avatars.com/api/?name=another&background=random',
          },
          score: 25,
        },
      ],
    };

    // action
    const nextState = leaderboardsSlice(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload);
  });
});
