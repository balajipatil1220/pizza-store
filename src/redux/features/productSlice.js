import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  iserror: false,
  error: "",
  products: [],
  filteredProducts: [],
};

export const fetch_products = createAsyncThunk(
  "product/fetch_products",
  async () => {
    const response = await axios.get(
      "https://6507ea2456db83a34d9b7024.mockapi.io/pizza"
    );
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    filterByPrice: (state, action) => {
      if (action.payload === "lowest") {
        state.filteredProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === "highest") {
        state.filteredProducts.sort((a, b) => b.price - a.price);
      } else {
        state.filteredProducts = state.products;
      }
    },
    filterByRating: (state, action) => {
      if (action.payload === "lowest") {
        state.filteredProducts.sort((a, b) => a.rating - b.rating);
      } else if (action.payload === "highest") {
        state.filteredProducts.sort((a, b) => b.rating - a.rating);
      } else {
        state.filteredProducts = state.products;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch_products.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetch_products.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.isLoading = false;
      state.iserror = false;
      state.error = "";
    });
    builder.addCase(fetch_products.rejected, (state) => {
      state.isLoading = false;
      state.iserror = true;
      state.error = "something got error";
      state.products = [];
      state.filteredProducts = [];
    });
  },
});

export const { addAllProducts, filterByPrice, filterByRating } =
  productSlice.actions;

export default productSlice.reducer;
