import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import Tags from './Tags';

/**
 * Tags Component skenario testing
 *
 *   - should show tags on screen
 *   - should change display not have btn-outline when and button is clicked
 *   - should change display have btn-outline when and button is clicked again
 * */

expect.extend(matchers);
describe('Tags Component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should show tags on screen', async () => {
    // arrange
    const mockTags = vi.fn();
    render(<Tags tag="test" clickTag={mockTags} unclickTag={mockTags} />);
    const tag = await screen.getByRole('button');

    // action
    await userEvent.click(tag);

    expect(tag).toBeInTheDocument();
    expect(mockTags).toHaveBeenCalled();
  });
  it('should change display not have btn-outline when and button is clicked', async () => {
    // arrange
    const mockTags = vi.fn();
    render(<Tags tag="test" clickTag={mockTags} unclickTag={mockTags} />);
    const tag = await screen.getByRole('button');

    // action
    await userEvent.click(tag);

    expect(mockTags).toHaveBeenCalled();
    expect(tag).not.toHaveClass('btn-outline');
  });
  it('should change display have btn-outline when and button is clicked again', async () => {
    // arrange
    const mockTags = vi.fn();
    render(<Tags tag="test" clickTag={mockTags} unclickTag={mockTags} />);
    const tag = await screen.getByRole('button');

    // action 1
    await userEvent.click(tag);
    expect(mockTags).toHaveBeenCalled();

    // action 2
    await userEvent.click(tag);
    expect(mockTags).toHaveBeenCalled();

    expect(tag).toHaveClass('btn-outline');
  });
});
