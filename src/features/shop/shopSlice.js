import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import json from "../../data.json";

export const getItems = createAsyncThunk(
  "getItems",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://getirserver.herokuapp.com/api/products"
      );
      const { data } = response;
      const mugs = data.filter((item) => item.itemType === "mug");
      const shirts = data.filter((item) => item.itemType === "shirt");

      mugs.sort((a, b) => {
        return a.price - b.price;
      });
      shirts.sort((a, b) => {
        return a.price - b.price;
      });
      const items = { mugs, shirts };
      dispatch(setItems(items));
    } catch (error) {
      return rejectWithValue(error.data.response);
    }
  }
);

export const getCompanies = createAsyncThunk(
  "getItems",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://getirserver.herokuapp.com/api/companies"
      );
      const { data } = response;
      dispatch(setCompanies(data));
    } catch (error) {
      return rejectWithValue(error.data.response);
    }
  }
);

const initialState = {
  items: {
    mugs: [],
    shirts: [],
  },
  tags: [],
  companies: [],
  sortType: "lowToHigh",
  checkedTags: [],
  checkedCompanies: [],
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
    setCheckedTags: (state, action) => {
      state.checkedTags = action.payload;
    },
    setCheckedCompanies: (state, action) => {
      state.checkedCompanies = action.payload;
    },
  },
});

export const {
  setSortType,
  setItems,
  setCompanies,
  setTags,
  setCheckedCompanies,
  setCheckedTags,
} = shopSlice.actions;
export default shopSlice.reducer;
