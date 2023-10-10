import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { createLogger } from "redux-logger";
import { reducer } from "./reducers/allReducers";

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a Redux Logger instance
const logger = createLogger();

// Combine Redux Persist and Redux Logger middleware
const middleware = applyMiddleware(logger);

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = configureStore(
  {
    reducer: persistedReducer,
  },
  middleware
);
const persistor = persistStore(store);

export { store, persistor };
