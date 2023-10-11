import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer } from "./reducers/allReducers";
import thunk from "redux-thunk";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
};

// Create a logger for Redux actions and state changes
const logger = createLogger();

// Apply Redux Persist to  reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Configure the Redux store with middleware
const store = configureStore({
  reducer: persistedReducer, // The root reducer with Redux Persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger), // Applied Redux Thunk and the logger middleware
});

// Create a persistor to persist the Redux store
const persistor = persistStore(store);

export { store, persistor };
