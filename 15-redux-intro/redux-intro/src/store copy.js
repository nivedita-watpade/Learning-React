import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialStateAccount, action) {
  const { type, payload } = action;
  if (type === "account/deposit") {
    return { ...state, balance: state.balance + payload };
  }
  if (type === "account/withdraw") {
    return { ...state, balance: state.balance - payload };
  }
  if (type === "account/requestLoan") {
    if (state.loan > 0) return state;
    return {
      ...state,
      loan: payload.amount,
      loanPurpose: payload.purpose,
      balance: state.balance + payload.amount,
    };
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

// =========================================== Customer ===================================

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: Date.now().toString },
  };
}

function UpdateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

function customerReducer(state = initialStateCustomer, action) {
  const { type, payload } = action;
  if (type === "customer/createCustomer") {
    return {
      ...state,
      fullName: payload.fullName,
      nationalId: payload.nationalId,
      createdAt: payload.createdAt,
    };
  }

  if (type === "customer/updateName") {
    return {
      ...state,
      fullName: payload,
    };
  }

  return state;
}

const rootRudecer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootRudecer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });
// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose: "Buy a Car" },
// });
// store.dispatch({ type: "account/payLoan" });

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a Car"));
console.log(store.getState());

store.dispatch(payLoan(1000, "Buy a Car"));
console.log(store.getState());

store.dispatch(createCustomer("Nivedita", "AGNP12340"));
console.log(store.getState());

store.dispatch(deposit(600));
console.log(store.getState());

store.dispatch(UpdateName("nIVI"));
console.log(store.getState());
