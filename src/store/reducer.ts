import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./auth/slice";
import accountReducer from "./account/slice";
import brandReducer from "./brand/slice";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  brand: brandReducer,
});

export default rootReducer;
