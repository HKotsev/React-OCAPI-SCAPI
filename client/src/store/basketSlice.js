import { createSlice } from "@reduxjs/toolkit";
const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: null,
  },
  reducers: {
    createBasket: (state, actions) => {
      state.basket = actions.payload;
    },
  },
});
export const basketActions = basketSlice.actions;
export default basketSlice.reducer;
