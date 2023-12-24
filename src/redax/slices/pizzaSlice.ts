import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ sort, order, category, search, currentPage }) => {
    const { data } = await axios.get(
      `https://63c844465c0760f69ac8e732.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sort.replace(
        "-",
        ""
      )}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
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
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.status = "success";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectPizzeData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
