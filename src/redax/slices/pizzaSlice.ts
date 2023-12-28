import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortPropertyEnam } from './filterSlice';

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export type FetchPizzasParams = {
  sortId: string;
  order: string;
  category: string;
  search: string;
  currentPage: number;
  sortProperty?: string;
  sort?: SortPropertyEnam;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async ({ sortId, order, category, search, currentPage }) => {
    const { data } = await axios.get<PizzaItem[]>(
      `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortId}&order=${order}${search}`
    );
    return data;
  }
);

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

interface PizzaSlice {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSlice = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzeData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
