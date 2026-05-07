const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  const { type, payload } = action;
  if (type === "account/deposit") {
    return { ...state, balance: state.balance + payload, isLoading: false };
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

  if (type === "account/covertingCurrency") {
    return {
      ...state,
      isLoading: true,
    };
  }

  return state;
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return function convert(dispatch, getState) {
    dispatch({ type: "account/covertingCurrency" });
    fetch(`https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`)
      .then((resp) => resp.json())
      .then((data) => {
        const convertedAmount = (amount * data.rates["USD"]).toFixed(2);
        dispatch({ type: "account/deposit", payload: convertedAmount });
      });
  };
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
