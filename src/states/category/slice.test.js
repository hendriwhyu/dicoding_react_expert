import { describe, expect, it } from 'vitest';
import categorySlice from './slice';

/**
    test scenario for categorySlice (reducers)

    categoryReducers function
    - should return the initial state when given by unknown action
    - should return category when given by RECEIVE_THREADS action
    - should return category when given by SET_CATEGORIES action
    - should return null category when given by CLEAR_CATEGORIES action
*/

describe('categoryReducers function', () => {
  it('should return then initial state when given by unknown action', () => {
    const initalState = {
      values: [],
      selectedCategory: {},
    };
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const nextState = categorySlice(initalState, action);
    expect(nextState).toEqual(initalState);
  });
  it('should return category when given by RECEIVE_THREADS action', () => {
    const initialState = {
      values: [],
      selectedCategory: {},
    };
    const action = {
      type: 'categories/receiveCategories',
      payload: [
        {
          id: '1',
          name: 'react',
        },
        {
          id: '2',
          name: 'redux',
        },
      ],
    };
    const nextState = categorySlice(initialState, action);

    expect(nextState).toEqual({
      selectedCategory: null,
      values: action.payload,
    });
  });
  it('should return category when given by SET_CATEGORIES action', () => {
    const initialState = {
      values: ['react', 'redux'],
      selectedCategory: null,
    };
    const action = {
      type: 'categories/setCategories',
      payload: {
        selectedCategory: 'react',
      },
    };
    const nextState = categorySlice(initialState, action);

    expect(nextState).toEqual({
      ...initialState,
      selectedCategory: action.payload,
    });
  });
  it('should return category  when given by CLEAR_CATEGORIES action', () => {
    const initialState = {
      values: ['react', 'redux'],
      selectedCategory: 'react',
    };
    const action = {
      type: 'categories/clearCategories',
    };
    const nextState = categorySlice(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      selectedCategory: null,
    });
  });
});
