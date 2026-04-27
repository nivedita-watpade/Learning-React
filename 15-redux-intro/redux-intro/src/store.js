import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootRudecer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootRudecer);

export default store;
