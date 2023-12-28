import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnam {
  RETING_DESC = 'rating',
  RETING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

export type Sort = {
  name: string;
  sort: SortPropertyEnam;
};

interface FilterSlice {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
  // order: string;
}

const initialState: FilterSlice = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: { name: 'популярности', sort: SortPropertyEnam.RETING_DESC },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSlice>) {
      console.log(action.payload.currentPage);

      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});
export const selectFilterSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setSearchValue,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
