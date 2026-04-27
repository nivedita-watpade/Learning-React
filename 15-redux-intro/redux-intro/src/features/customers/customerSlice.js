const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

export default function customerReducer(state = initialStateCustomer, action) {
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

export function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: Date.now().toString },
  };
}

export function UpdateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
