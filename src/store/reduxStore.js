import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import expenseReducer from "./expenseReducer";
import themeReducer from "./themeReducer";
import userDetailsReducer from "./userDetailsReducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    theme: themeReducer,
    details: userDetailsReducer,
  },
});

export default store;
