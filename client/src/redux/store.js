import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const createAppStore = async () => {
  try {
    const store = configureStore({
      reducer: rootReducer,
      middleware: [thunk],
    });
    return store;
  } catch (err) {
    throw new Error("Some error occurred");
  }
};

export default createAppStore;
