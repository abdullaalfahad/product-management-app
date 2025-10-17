import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth-api";
import { productApi } from "./services/product-api";
import authReducer from "./slices/auth-slice";
import productFilterReducer from "./slices/product-filter-slice";
import { categoryApi } from "./services/category-api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productFilter: productFilterReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      categoryApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
