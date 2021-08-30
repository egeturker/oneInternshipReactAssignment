import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import json from "../../data.json";
const initialState = {
  items: {
    mugs: [],
    shirts: [],
  },
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getItems: (state) => {
      const itemData = json;
      const mugs = itemData.filter((item) => item.itemType === "mug");
      const shirts = itemData.filter((item) => item.itemType === "shirt");
      state.items.mugs = mugs;
      state.items.shirts = shirts;
    },
  },
});

export const { getItems } = shopSlice.actions;
export default shopSlice.reducer;
