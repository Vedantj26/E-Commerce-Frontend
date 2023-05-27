import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/auth.reducer";
import prodReducer from "../Reducers/prod.reducer";
import catReducer from "../Reducers/cat.reducer";
import navReducer from "../Reducers/nav.reducer";
import cartReducer from "../Reducers/cart.reducer";
import orderReducer from "../Reducers/order.reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prod: prodReducer,
    cat: catReducer,
    nav: navReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
