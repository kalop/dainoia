import { configureStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import authSlice from "./authSlice";

const Store = configureStore({
  reducer: {
    common: commonSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
  