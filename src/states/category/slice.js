import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  values: [],
  selectedCategory: {},
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    receiveCategories(state, action) {
      return {
        ...state,
        values: action.payload.filter(
          (item, index, self) => index === self.indexOf(item),
        ),
        selectedCategory: null,
      };
    },
    setCategories(state, action) {
      return {
        ...state,
        selectedCategory: action.payload.categories,
      };
    },
    clearCategories(state) {
      return {
        ...state,
        selectedCategory: null,
      };
    },
  },
});

export const { receiveCategories, setCategories, clearCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
