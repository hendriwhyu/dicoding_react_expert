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
import { asyncSetAuthUser, asyncUnsetAuthUser } from './thunk';
import { setAuthUser, unsetAuthUser } from './slice';
/**
 * skenario test
 *
 * - asyncSetAuthUser thunk :
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed

 * - asyncUnsetAuthUser thunk :
 *  - should dispatch action correctly when data fetching success
 */

const fakeTokensResponse = 'token-1';
const fakeAuthResponse = [
  {
    id: 'user-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
];
const fakeErrorResponse = new Error('Ups, something went wrong');
describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._getOwnProfile;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeTokensResponse);
    api.getOwnProfile = () => Promise.resolve(fakeAuthResponse);

    // mock
    const dispatch = vi.fn();

    // action
    await asyncSetAuthUser(fakeAuthResponse)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeAuthResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncSetAuthUser(fakeAuthResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    api._putAcessToken = api.putAcessToken;
  });
  afterEach(() => {
    api.putAcessToken = api._putAcessToken;

    delete api._putAcessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.putAcessToken = () => Promise.resolve('');

    // mock
    const dispatch = vi.fn();

    // action
    await asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUser());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
