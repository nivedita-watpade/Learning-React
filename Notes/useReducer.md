================================= useReducer in React =====================

useReducer is a React Hook used for managing complex state logic.
It is an alternative to useState.

It is especially useful when:
-State has multiple related values
-State logic is complex
-The next state depends on the previous state
-You want a more predictable state flow (like Redux)

📌 Syntax
const [state, dispatch] = useReducer(reducer, initialState);

Parameters:
-reducer → A function that decides how state changes
-initialState → Initial value of the state

Returns:
-state → Current state
-dispatch → Function to send actions

"What is useReducer and when would you use it?"
useReducer is a React hook used for managing complex state logic. It works similar to Redux where we have a reducer function that takes the current state and an action, and returns a new state. I prefer using useReducer when the state has multiple related fields or when state updates depend on previous state, because it makes the logic more predictable and maintainable.

Ex.

📌 When to use:

Multiple related fields → better than multiple useState.

```jsx
import React, { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <form>
      <input
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        value={state.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}

export default Form;
```

========================================================================================

📌 Why useReducer?
useState is not enough in certain situations:
1️⃣ When a component has many state variables
-State updates are spread across multiple event handlers
-Logic becomes messy and hard to manage

2️⃣ When multiple state updates must happen together
-Example: Starting a game → reset score, set player, start timer
-Coordinating multiple setState calls becomes complex

3️⃣ When state depends on other state values
-Updating one piece of state affects others
-Logic becomes tightly coupled and harder to maintain

👉 In these situations, useReducer is very helpful

📌 Managing State with useReducer
✅ What is useReducer?
An alternative to useState
Ideal for:
-Complex state
-Related pieces of state
-Centralized state logic

📌 Basic Syntax
const [state, dispatch] = useReducer(reducer, initialState);

📌 Core Concepts
1️⃣ State
-Stored as a single object
-Can contain multiple related values
const initialState = {
count: 0,
user: null
};

2️⃣ Reducer Function
A pure function (no side effects)
Takes: current state + action
Returns: next state

3️⃣ Action
-An object that describes what should happen

Structure:
{
type: "actionName",
payload: data
}
Ex.
dispatch({ type: "setCount", payload: 23 });

4️⃣ Dispatch
-Function used to send actions to reducer
-Triggers state update
Instead of:
setCount(5);
We use:
dispatch({ type: "setCount", payload: 5 });

📌 How useReducer Updates State
Flow:
dispatch(action)
↓
reducer(currentState, action)
↓
returns nextState
↓
React re-renders

📌 Comparison: useReducer vs useState

1. useReducer
   -Good for complex state
   -Centralizes update logic
   -Uses dispatch()
   -Based on reducer pattern

2. useState
   -Good for simple state
   -Logic scattered in handlers
   -Uses setState()
   -Direct state update

📌 Key Advantages of useReducer
✔ Better for complex logic
✔ Cleaner and more predictable updates
✔ Decouples state logic from UI
✔ Easier to maintain
✔ Similar to Array.reduce() concept

====================================== useState vs useReducer ===========================================

🔹 useState
✅ Best For
Single, independent pieces of state
(numbers, strings, booleans, simple arrays)

✅ How It Works
Logic to update state is written directly inside:
-Event handlers
-useEffect

State is updated using the setter function:
const [count, setCount] = useState(0);
setCount(1);

✅ Characteristics
-Imperative updates

setScore(0);
setPlaying(true);
setTimerSec(0);

-Logic may be spread across multiple components
-Easy to understand and implement
-Good default choice

🔹 useReducer
✅ Best For
-Multiple related pieces of state
-Complex state (objects with nested values or arrays)
-When state transitions are structured

✅ How It Works
State logic is centralized inside a reducer function
Component dispatches actions
dispatch({ type: "startGame" });

✅ Characteristics
Declarative state updates
Complex transitions mapped to action types
Logic is decoupled from components
More scalable for complex flows
Slightly harder to understand compared to useState

📌 When to Use useReducer?
Use this decision guide:

1️⃣ Just one piece of state?
👉 Yes → useState
👉 No → useReducer

2️⃣ Do multiple states frequently update together?
👉 Yes → Consider useReducer
👉 No → useState

3️⃣ Do you have 3–4+ related state variables (especially objects)?
👉 Yes → useReducer
👉 No → useState

4️⃣ Are too many event handlers making the component messy?
👉 Yes → useReducer
👉 No → useState

5️⃣ Are you okay with slightly more complex code?
👉 Yes → useReducer
👉 No → useState
