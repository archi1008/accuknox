// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";

const store = configureStore({reducer:{authentication: authReducer}});

export default store;
