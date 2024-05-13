import { describe, expect, it } from 'vitest';
import threadsSlice from './slice';

/**
    test scenario for threadSlice (reducers)

    threadReducers function
    - should return the initial state when given by unknown action
    - should return the thread when given by RECEIVE_THREADS action
    - should return the thread when given by ADD_THREADS action
    - should add upVotesBy when given by TOGGLE_LIKE_THREAD action
    - should add downVotesBy when given by TOGGLE_DISLIKE_THREAD action
    - should neutralized upVotesBy or downVotesBy when given by TOGGLE_NEUTRAL_THREAD action
*/

describe('threadReducers function', () => {
  it('should return then initial state when given by unknow action', () => {
    const initalState = [];
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const nextState = threadsSlice(initalState, action);

    expect(nextState).toEqual(initalState);
  });
  it('should return the talks when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: 'threads/receiveThreads',
      payload: {
        threads: [
          {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            category: 'redux',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'user-mQhLzINW_w5TxxYf',
          },
        ],
      },
    };

    const nextState = threadsSlice(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
  it('should return the talks when given by ADD_THREADS action', () => {
    const initalState = [
      {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-mQhLzINW_w5TxxYf',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'threads/addThreads',
      payload: {
        id: 'thread-2',
        title: 'Bagaimana kehidupanmu?',
        body: 'Coba ceritakan dong?',
        category: 'real-life',
        createdAt: '2024-05-29T07:55:52.266Z',
        ownerId: 'user-1',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    };

    const nextState = threadsSlice(initalState, action);

    expect(nextState).toEqual([action.payload, ...initalState]);
  });
  it('should add upVotesBy when given by TOGGLE_LIKE_THREAD action', () => {
    // arrange threads
    const initialState = [
      {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-mQhLzINW_w5TxxYf',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'threads/toggleLikeThread',
      payload: {
        id: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-1',
      },
    };

    // action: like thread
    const nextState = threadsSlice(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadsSlice(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
  it('should add downVotesBy when given by TOGGLE_DISLIKE_THREAD action', () => {
    // arrange threads
    const initialState = [
      {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-mQhLzINW_w5TxxYf',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const action = {
      type: 'threads/toggleDislikeThread',
      payload: {
        id: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-1',
      },
    };

    // action: dislike thread
    const nextState = threadsSlice(initialState, action);

    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    const nextState2 = threadsSlice(nextState, action);

    expect(nextState2).toEqual(initialState);
  });

  it('should neutralized upVotesBy or downVotesBy when given by TOGGLE_NEUTRAL_THREAD action', () => {
    // arrange threads
    const initialState = [
      {
        id: 'thread-Np47p4jhUXYhrhRn',
        title: 'Bagaimana pengalamanmu belajar Redux?',
        body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
        category: 'redux',
        createdAt: '2023-05-29T07:55:52.266Z',
        ownerId: 'user-mQhLzINW_w5TxxYf',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];

    const actionLike = {
      type: 'threads/toggleLikeThread',
      payload: {
        id: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-1',
      },
    };

    const actionNeutral = {
      type: 'threads/toggleNeutralThread',
      payload: {
        id: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-1',
      },
    };

    const actionDislike = {
      type: 'threads/toggleDislikeThread',
      payload: {
        id: 'thread-Np47p4jhUXYhrhRn',
        userId: 'user-1',
      },
    };

    // action: like
    const nextStateLike = threadsSlice(initialState, actionLike);

    // assert like
    expect(nextStateLike).toEqual([
      {
        ...initialState[0],
        upVotesBy: [actionLike.payload.userId],
      },
    ]);

    // action: neutral
    const nextStateNeutral = threadsSlice(nextStateLike, actionNeutral);

    // assert neutral
    expect(nextStateNeutral).toEqual(initialState);

    // action: dislike
    const nextStateDislike = threadsSlice(nextStateNeutral, actionDislike);

    // assert dislike
    expect(nextStateDislike).toEqual([
      {
        ...initialState[0],
        downVotesBy: [actionLike.payload.userId],
      },
    ]);

    // action: neutral
    const nextStateNeutral2 = threadsSlice(nextStateDislike, actionNeutral);

    // assert neutral
    expect(nextStateNeutral2).toEqual(initialState);
  });
});
