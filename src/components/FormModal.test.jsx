import React from 'react';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import FormModal from './FormModal';
import store from '../states/index';
/**
 * skenario testing
 *
 * - RegisterForm component
 *   - renders FormModal correctly
  -    should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call createThread function when submit button is clicked
 */
expect.extend(matchers);
describe('FormModal component', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders FormModal correctly', async () => {
    const mockCreateThread = vi.fn();
    render(
      <Provider store={store}>
        <FormModal hideModal={() => {}} submitHandler={mockCreateThread} />
      </Provider>,
    );
    const titleInput = await screen.getByPlaceholderText('Judul...');
    const categoryInput = await screen.getByPlaceholderText('Kategori...');
    const bodyInput = await screen.getByPlaceholderText('Deskripsi...');

    expect(titleInput).toBeInTheDocument();
    expect(categoryInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
  });
  it('should handle title typing correctly', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(
      <Provider store={store}>
        <FormModal hideModal={() => {}} submitHandler={mockCreateThread} />
      </Provider>,
    );
    const titleInput = await screen.getByPlaceholderText('Judul...');

    // action
    await userEvent.type(titleInput, 'Test 1');

    // assert
    expect(titleInput).toHaveValue('Test 1');
  });
  it('should handle category typing correctly', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(
      <Provider store={store}>
        <FormModal hideModal={() => {}} submitHandler={mockCreateThread} />
      </Provider>,
    );
    const categoryInput = await screen.getByPlaceholderText('Kategori...');

    // action
    await userEvent.type(categoryInput, 'test');

    // assert
    expect(categoryInput).toHaveValue('test');
  });
  it('should handle body typing correctly', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(
      <Provider store={store}>
        <FormModal hideModal={() => {}} submitHandler={mockCreateThread} />
      </Provider>,
    );
    const bodyInput = await screen.getByPlaceholderText('Deskripsi...');

    // action
    await userEvent.type(bodyInput, 'Halo saya testing');

    // assert
    expect(bodyInput).toHaveValue('Halo saya testing');
  });
  it('should call createThread function when submit button is clicked', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(
      <Provider store={store}>
        <FormModal hideModal={() => {}} submitHandler={mockCreateThread} />
      </Provider>,
    );
    const titleInput = await screen.getByPlaceholderText('Judul...');
    const categoryInput = await screen.getByPlaceholderText('Kategori...');
    const bodyInput = await screen.getByPlaceholderText('Deskripsi...');
    const submitButton = await screen.getByRole('button', {
      name: 'Submit',
    });

    // action
    await userEvent.type(titleInput, 'Test 1');
    await userEvent.type(categoryInput, 'test');
    await userEvent.type(bodyInput, 'Halo saya testing');
    await userEvent.click(submitButton);

    expect(mockCreateThread).toBeCalledWith({
      title: 'Test 1',
      category: 'test',
      body: 'Halo saya testing',
    });
  });
});
