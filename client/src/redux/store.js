import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { apiSlice, userSlice, taskSlice } from "./slices/index";
import searchReducer from "./slices/searchSlice";


const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [taskSlice.reducerPath]: taskSlice.reducer,
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      userSlice.middleware,
      taskSlice.middleware
    ),
  devTools: true,
});

export default store;
