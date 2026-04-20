import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          ...product,
          count: 1,
        });
      }
    },

    incrementItem(state, action) {
      const item = state.items.find((product) => product.id === action.payload);
      if (item) {
        item.count += 1;
      }
    },

    decrementItem(state, action) {
      const item = state.items.find((product) => product.id === action.payload);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  incrementItem,
  decrementItem,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
