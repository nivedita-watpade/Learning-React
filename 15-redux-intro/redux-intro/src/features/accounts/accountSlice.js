const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
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

export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
