import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToggleDislikeThread,
  asyncToggleLikeThread,
  asyncToggleNeutralThread,
} from './thunk';
import {
  addThreads,
  toggleDislikeThread,
  toggleLikeThread,
  toggleNeutralThread,
} from './slice';

/**
 * skenario test
 *
 * - asyncAddThread thunk:
 *  - should dispatch action correctly when create thread success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - asyncToggleLikeThread thunk:
 *  - should dispatch action correctly when toggle like thread success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - asyncToggleDislikeThread thunk:
 *  - should dispatch action correctly when toggle dislike thread success
 *  - should dispatch action and call alert correctly when data fetching failed
 * - asyncToggleNeutralThread thunk:
 *  - should dispatch action correctly when toggle neutral thread success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeCreateThreadsResponse = [
  {
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
  },
];
const fakeUsersInteractions = {
  id: 'user-mQhLzINW_w5TxxYf',
  userId: 'user-gJeyrYaTdSq2dZpA',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });
  afterEach(() => {
    api.createThread = api._createThread;

    delete api._createThread;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.resolve(fakeCreateThreadsResponse);

    // mock
    const dispatch = vi.fn();

    // action
    await asyncAddThread(fakeCreateThreadsResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      addThreads(fakeCreateThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.createThread = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();

    window.alert = vi.fn();

    // action
    await asyncAddThread(fakeCreateThreadsResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncToggleLikeThread thunk', () => {
  beforeEach(() => {
    api._toggleLikeThread = api.toggleLikeThread;
  });
  afterEach(() => {
    api.toggleLikeThread = api._toggleLikeThread;

    delete api._toggleLikeThread;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.toggleLikeThread = () => Promise.resolve(fakeUsersInteractions);

    // mock
    const dispatch = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleLikeThread(fakeUsersInteractions.id)(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleLikeThread(fakeUsersInteractions),
    );
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.toggleLikeThread = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleLikeThread(fakeUsersInteractions.id)(dispatch, getState);
    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncToggleDislikeThread thunk', () => {
  beforeEach(() => {
    api._toggleDislikeThread = api.toggleDislikeThread;
  });
  afterEach(() => {
    api.toggleDislikeThread = api._toggleDislikeThread;

    delete api._toggleDislikeThread;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.toggleDislikeThread = () => Promise.resolve(fakeUsersInteractions);

    // mock
    const dispatch = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleDislikeThread(fakeUsersInteractions.id)(
      dispatch,
      getState,
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleDislikeThread(fakeUsersInteractions),
    );
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.toggleDislikeThread = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleDislikeThread(fakeUsersInteractions.id)(dispatch, getState);
    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
describe('asyncToggleNeutralThread thunk', () => {
  beforeEach(() => {
    api._toggleNeutralThread = api.toggleNeutralThread;
  });
  afterEach(() => {
    api.toggleNeutralThread = api._toggleNeutralThread;

    delete api._toggleNeutralThread;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.toggleNeutralThread = () => Promise.resolve(fakeUsersInteractions);

    // mock
    const dispatch = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleNeutralThread(fakeUsersInteractions.id)(
      dispatch,
      getState,
    );

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      toggleNeutralThread(fakeUsersInteractions),
    );
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.toggleNeutralThread = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: fakeUsersInteractions.userId } });

    // action
    await asyncToggleNeutralThread(fakeUsersInteractions.id)(dispatch, getState);
    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
