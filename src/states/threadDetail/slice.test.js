import { describe, expect, it } from 'vitest';
import threadDetailSlice from './slice';
/**
    test scenario for threadDetailSlice (reducers)

    threadDetailReducers function
    - should return the initial state when given by unknown action
    - should return the thread when given by RECEIVE_THREADS action
    - should return null thread when given by CLEAR_THREAD_DETAIL action
    - should add upVotesBy when given by TOGGLE_LIKE_THREAD_DETAIL action
    - should add downVotesBy when given by TOGGLE_DISLIKE_THREAD_DETAIL action
    - should neutralized upVotesBy or downVotesBy when given by TOGGLE_NEUTRAL_THREAD_DETAIL action
    - should return the thread when given by ADD_COMMENTS action
*/

describe('threadDetailReducers function', () => {
  it('should return then initial state when given by unknown action', () => {
    // arrange
    const initialState = null;

    const action = {
      type: 'UNKNOWN_ACTION',
    };

    // action
    const nextState = threadDetailSlice(initialState, action);

    expect(nextState).toEqual(initialState);
  });
  it('should return the thread when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = null;

    // action
    const action = {
      type: 'threadDetail/receiveThreadDetail',
      payload: {
        id: 'thread-1',
        title: 'Halo',
        body: 'Bagaimana kabarmu?',
        createdAt: '2023-05-29T07:54:35.746Z',
        owner: {
          id: 'user-aROWej8yYA1sOfHN',
          name: 'Dicoding',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
        category: 'perkenalan',
        comments: [
          {
            id: 'comment-1',
            content: 'Halo! kondisi saya baik.',
            createdAt: '2023-10-29T07:59:04.689Z',
            owner: {
              id: 'user-mQhLzINW_w5TxxYf',
              name: 'Hendri',
              avatar:
                'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
            },
            upVotesBy: [],
            downVotesBy: [],
          },
        ],
        upVotesBy: [],
        downVotesBy: [],
      },
    };

    const nextState = threadDetailSlice(initialState, action);

    expect(nextState).toEqual(action.payload);
  });
  it('should return null thread when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Halo',
      body: 'Bagaimana kabarmu?',
      createdAt: '2023-05-29T07:54:35.746Z',
    };

    const action = {
      type: 'threadDetail/clearThreadDetail',
    };

    const nextState = threadDetailSlice(initialState, action);

    expect(nextState).toEqual(null);
  });
  it('should add upVotesBy when given by TOGGLE_LIKE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Halo',
      body: 'Bagaimana kabarmu?',
      createdAt: '2023-05-29T07:54:35.746Z',
      owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'perkenalan',
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'threadDetail/toggleLikeThreadDetail',
      payload: 'user-1',
    };

    // action like
    const nextState = threadDetailSlice(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload],
    });

    // action unlike
    const nextState2 = threadDetailSlice(nextState, action);
    expect(nextState2).toEqual(initialState);
  });
  it('should add downVotesBy when given by TOGGLE_DISLIKE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Halo',
      body: 'Bagaimana kabarmu?',
      createdAt: '2023-05-29T07:54:35.746Z',
      owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'perkenalan',
      upVotesBy: [],
      downVotesBy: [],
    };

    const action = {
      type: 'threadDetail/toggleDislikeThreadDetail',
      payload: 'user-1',
    };

    // action dislike
    const nextState = threadDetailSlice(initialState, action);
    // assert dislike
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload],
    });

    // action undislike
    const nextState2 = threadDetailSlice(nextState, action);
    // assert undislike
    expect(nextState2).toEqual(initialState);
  });

  it('should neutralized upVotesBy or downVotesBy when given by TOGGLE_NEUTRAL_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Halo',
      body: 'Bagaimana kabarmu?',
      createdAt: '2023-05-29T07:54:35.746Z',
      owner: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      category: 'perkenalan',
      upVotesBy: [],
      downVotesBy: [],
    };

    const actionLike = {
      type: 'threadDetail/toggleLikeThreadDetail',
      payload: 'user-1',
    };

    // action like
    const nextStateLike = threadDetailSlice(initialState, actionLike);

    // assert like thread
    expect(nextStateLike).toEqual({
      ...initialState,
      upVotesBy: [actionLike.payload],
    });

    const actionNeutral = {
      type: 'threadDetail/toggleNeutralThreadDetail',
      payload: 'user-1',
    };

    // action neutral
    const nextStateNeutral = threadDetailSlice(nextStateLike, actionNeutral);

    // assert neutral thread
    expect(nextStateNeutral).toEqual(initialState);

    // action dislike
    const actionDislike = {
      type: 'threadDetail/toggleDislikeThreadDetail',
      payload: 'user-1',
    };

    // action dislike
    const nextStateDislike = threadDetailSlice(nextStateNeutral, actionDislike);
    // assert dislike
    expect(nextStateDislike).toEqual({
      ...initialState,
      downVotesBy: [actionDislike.payload],
    });

    // action neutral
    const nextStateNeutral2 = threadDetailSlice(
      nextStateDislike,
      actionNeutral,
    );

    // assert neutral thread
    expect(nextStateNeutral2).toEqual(initialState);
  });
  it('should return the thread when given by ADD_COMMENTS action', () => {
    // arrange
    const initialState = {
      id: 'thread-Np47p4jhUXYhrhRn',
      title: 'Bagaimana pengalamanmu belajar Redux?',
      body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
      createdAt: '2023-05-29T07:55:52.266Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      category: 'redux',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'threadDetail/addComentThreadDetail',
      payload: {
        id: 'comment-RlZTrl3gFcqyf7Zp',
        content: 'test',
        createdAt: '2024-05-12T09:01:03.545Z',
        upVotesBy: [],
        downVotesBy: [],
        owner: {
          id: 'user-BOtxCoXRlcxnMZkY',
          name: 'Hendri Wahyu',
          email: 'hendriwp123@gmail.com',
          avatar:
            'https://ui-avatars.com/api/?name=Hendri Wahyu&background=random',
        },
      },
    };
    // action
    const nextState = threadDetailSlice(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload],
    });
  });
});
