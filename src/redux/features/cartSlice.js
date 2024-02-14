import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    subTotal: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, size, toppings } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += quantity;
        state.items[existingItemIndex].toppings = toppings;
        state.items[existingItemIndex].size = size;
      } else {
        state.items.push({ product, size, toppings, quantity: quantity });
      }
      state.totalQuantity += quantity;
      state.subTotal += quantity * product.price;
    },
    increaseQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      if (state.items[existingItemIndex]) {
        state.items[existingItemIndex].quantity += 1;
        state.totalQuantity += 1;
        state.subTotal += state.items[existingItemIndex].product.price;
      }
    },
    decreaseQuantity: (state, action) => {
      const { productId } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      if (state.items[existingItemIndex].quantity > 1) {
        state.items[existingItemIndex].quantity -= 1;
        state.totalQuantity -= 1;
        state.subTotal -= state.items[existingItemIndex].product.price;
      } else {
        state.totalQuantity -= 1;
        state.subTotal -= state.items[existingItemIndex].product.price;
        state.items.splice(existingItemIndex, 1);
      }
    },
    addTopping: (state, action) => {
      const { productId, topping } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      state.items[existingItemIndex].toppings.push(topping);
    },
    addSize: (state, action) => {
      const { productId, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === productId
      );
      state.items[existingItemIndex].size = size;
    },
    removeItem: (state, action) => {
      const { product, quantity } = action.payload;

      console.log(quantity,product);
      const removeItem = state.items.filter(
        (item) => item.product.id != product.id
      );
      console.log(removeItem);
      state.items = removeItem;
      state.totalQuantity -= quantity;
      state.subTotal -= product.price * quantity;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  addTopping,
  addSize,
  removeItem,
  setShowCart,
} = cartSlice.actions;

export default cartSlice.reducer;
