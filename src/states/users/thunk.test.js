import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { toast } from 'react-toastify';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncRegisterUser } from './thunk';
/**
 * skenario test
 *
 * - asyncRegisterUser thunk:
 *  - should dispatch action correctly when create user success
 *  - should dispatch action and call alert correctly when data fetching failed
 */
const fakeRegisterResponse = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    password: 'password',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });
  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });
  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);
    // mock
    const dispatch = vi.fn();
    // action
    await asyncRegisterUser(fakeRegisterResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toReturn({ error: null });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock
    const dispatch = vi.fn();
    const mockToast = vi.fn();
    toast.error = mockToast;
    // action
    await asyncRegisterUser(fakeRegisterResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(mockToast).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
