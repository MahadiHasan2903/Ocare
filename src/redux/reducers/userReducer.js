// userReducer.js
import { createReducer } from "@reduxjs/toolkit";
import { setUser, resetUser } from "../actions/userAction";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(resetUser, (state) => {
      state.user = null;
    });
});

export default userReducer;
