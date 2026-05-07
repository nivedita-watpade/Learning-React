import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  if (type === "account/deposit") {
    return { ...state, balance: state.balance + payload };
  }
  if (type === "account/withdraw") {
    return { ...state, balance: state.balance - payload };
  }
  if (type === "account/requestLoan") {
    if (state.loan > 0) return state;
    return { ...state, loan: payload };
  }
  if (type === "account/payLoan") {
    return {
      ...state,
      loan: 0,
      loanPurpose: "",
      balance: state.balance - state.loan,
    };
  }

  return state;
}

const store = createStore(reducer);
