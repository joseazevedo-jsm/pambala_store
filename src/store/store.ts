import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    auth: authReducer,
  },
});

export type RootState = {
  cart: ReturnType<typeof cartReducer>;
  wishlist: ReturnType<typeof wishlistReducer>;
  auth: ReturnType<typeof authReducer>;
};
export type AppDispatch = typeof store.dispatch;
