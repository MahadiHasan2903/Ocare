import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  patients: [],
  error: null,
};

const patientReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("fetchPatientsRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase("fetchPatientsSuccess", (state, action) => {
      state.isLoading = false;
      state.patients = action.payload;
      state.error = null;
    })
    .addCase("fetchPatientsFailure", (state, action) => {
      state.isLoading = false;
      state.patients = [];
      state.error = action.payload;
    });
});

export default patientReducer;
