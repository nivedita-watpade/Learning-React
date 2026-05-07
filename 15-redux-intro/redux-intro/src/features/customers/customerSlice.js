import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

console.log(customerSlice);

export const { createCustomer, updateName } = customerSlice.actions;

export default customerSlice.reducer;

// export default function customerReducer(state = initialState, action) {
//   const { type, payload } = action;
//   if (type === "customer/createCustomer") {
//     return {
//       ...state,
//       fullName: payload.fullName,
//       nationalId: payload.nationalId,
//       createdAt: payload.createdAt,
//     };
//   }

//   if (type === "customer/updateName") {
//     return {
//       ...state,
//       fullName: payload,
//     };
//   }

//   return state;
// }

// export function createCustomer(fullName, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalId, createdAt: Date.now().toString },
//   };
// }

// export function UpdateName(fullName) {
//   return {
//     type: "customer/updateName",
//     payload: fullName,
//   };
// }
