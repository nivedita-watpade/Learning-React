📘 What is Redux?
-A 3rd-party library used to manage global state
-It is a standalone library, but commonly used with React via react-redux
-Stores all global data in a single centralized store
-State is updated using actions
-Conceptually similar to:
-Context API + useReducer
Two versions:
-Classic Redux
-Redux Toolkit (modern & recommended)

👉 Important:
Understanding useReducer helps a lot in learning Redux

📘 Redux Use Cases
🔹 Local State (No Redux needed)

Use when state is limited to components:
-useState
-useReducer
-useRef

🌍 Global State (Redux can be useful)
UI State:
-Context API + hooks
-Redux / Zustand / Recoil
-React Router

👉 Use Redux when:
-You have a lot of global UI state
-State updates frequently

🌐 Remote State (API data)
Better tools than Redux:
-React Query
-SWR
-RTK Query

👉 Reason:
These tools are optimized for server data handling

⚠️ Key Insight
Many modern apps don’t need Redux
Use it only when global state becomes complex & hard to manage

⚙️ Mechanism of Redux (How it works)
Flow:
Event happens in component
→ dispatch(action)
→ Action sent to store
→ Reducer(s) process it
→ Create next state
→ UI re-renders

🔹 Core Concepts
🧠 Store
-Central place where all global state lives
-Single source of truth

⚡ Action
-Object describing what happened
Example:
{ type: "deposit", payload: 50 }

🔁 Reducer
-Pure function
Takes:
-current state
-action

Returns:
-new state

👉 Usually:
One reducer per feature (cart, user, theme, etc.)

🔄 Re-rendering
-When global state updates:
-All subscribed components re-render

======================== Redux Middleware & Thunks =====================

🧠 Redux Thunk & Middleware – Notes
🔹 Problem in Redux
Redux cannot handle async operations directly
❌ Reducers:
-Must be pure functions
-No API calls / side effects allowed

❌ Store:
-Only handles synchronous dispatch

🔹 Solution → Middleware
What is Middleware?
A function that sits between:

Component → dispatch → Middleware → Store (Reducer)

👉 It intercepts actions before they reach the reducer

🔹 What Middleware Can Do:
-Handle async operations
-Perform side effects
-Modify / delay / cancel actions

Examples:
-API calls
-Timers
-Logging
-Authentication checks

🔹 How Thunk Works (Flow)
Component → dispatch → Thunk → API call → dispatch → Store

Step-by-step:
-Component dispatches action
-Action goes to Thunk middleware
-Thunk performs async task (API call)
-Waits for data ⏳
-Dispatches action with data
-Store updates state

🔹 Key Idea
👉 Thunk delays dispatch
-Dispatch happens after data arrives

🔹 Important Rules
❌ No async code in reducers
❌ Avoid API calls in components
✅ Use middleware for async logic
✅ Keep components clean

========================= Redux Thunk Notes ======================

📘 Redux Thunks – Notes
🤔 Where to make async API calls in Redux?
❌ Not in reducers
Reducers must be pure functions
No side effects (no API calls, no async logic)

🔄 Flow with Thunk Middleware

Component → dispatch → Thunk Middleware → Store (Reducer)

-A component dispatches an action
-Instead of going directly to the store, it passes through Thunk middleware
-Thunk handles async logic, then dispatches a normal action to reducers

⚙️ What is Redux Thunk?
Middleware for Redux
Allows you to write functions inside dispatch
Handles:
API calls
Timers
Logging
Any side effects

✅ Why use Thunks?
✔ Can perform asynchronous operations
✔ Dispatch actions after async work completes
✔ Centralized place for side effects
✔ Keeps components cleaner

==================== Redux Toolkit (RTK) =========================================

✅ What is Redux Toolkit?
-The modern and recommended way to write Redux code
-Designed to simplify Redux development and enforce best practices

✅ Key Features
-Uses an opinionated approach → encourages best practices automatically
-Fully compatible with classic Redux → can be used together
-Helps write less boilerplate code
-Makes Redux easier, faster, and cleaner

✅ Major Benefits

1. Simplified State Updates
   -Allows writing "mutating" logic inside reducers
   -Actually keeps state immutable using the Immer library behind the scenes

2. Automatic Action Creators
   -No need to manually write action creators
   -They are generated automatically

3. Built-in Setup
   -Comes with Redux Thunk middleware pre-configured
   -Includes Redux DevTools setup by default

✅ Why Use Redux Toolkit?
-Reduces complexity of traditional Redux
-Saves development time
-Improves code readability and maintainability
-Standardizes how Redux apps are written

================================= create store using RTK ========================

Use configureStore() instead of createStore()
Combine reducers inside reducer object
Middleware (Thunk) & DevTools are auto-configured
Use createSlice() to reduce boilerplate

======================== createSlice workflow =========================

createSlice() is a helper from Redux Toolkit Docs
that automatically creates:
-Redux reducer
-Action creators
-Action types

from one configuration object.

1. Component Dispatches an Action
   Inside your component:
   dispatch(createCustomer(fullName, nationalId));
   Here:
   createCustomer is an action creator
   dispatch() sends the action to Redux store

2. createCustomer() Action Creator Runs
   This comes from:
   export const { createCustomer, updateName } = customerSlice.actions;
   Redux Toolkit automatically generated this function from your reducer name.

3. prepare() Executes First
   Your code:
   `prepare(fullName, nationalId, createdAt) {
  return {
    payload: {
      fullName,
      nationalId,
      createdAt,
    },
  };
}`

4. Redux Sends Action to Reducer
   Now reducer runs:
   `reducer(state, action) {
  state.fullName = action.payload.fullName;
  state.nationalId = action.payload.nationalId;
  state.createdAt = action.payload.createdAt;
}`

5. Store Updates
   Redux store updates state.
   React component re-renders automatically if using:
   useSelector()

Internal Structure of createSlice
Your slice:
`const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {}
});`

Full Flow Diagram

`User clicks button
        ↓
handleClick()
        ↓
dispatch(createCustomer())
        ↓
prepare() runs
        ↓
action object created
        ↓
{
  type: "customer/createCustomer",
  payload: {...}
}
        ↓
Redux dispatches action
        ↓
Reducer runs
        ↓
State updates
        ↓
Store updated
        ↓
React re-renders`

=========================================================================

Context API vs Redux — Notes

Context API + useReducer
Pros:
-Built into React
-Easy to set up for a single context
-Good for small apps
-Useful for avoiding prop drilling
-Good for managing state in a local sub-tree of the app

Best Use Cases
Use Context API when:
State does not change often
-Theme
-Language
-Authenticated user
You only need simple global state
App is small or medium-sized
You want simple state sharing

Cons:
Every new state area may require a new context
Can lead to “Provider Hell”
No built-in async handling
Performance optimization becomes difficult
Only React DevTools support

===================================================================

Redux
Pros
Better for large applications
Easy to add additional slices once setup is complete
Excellent DevTools
Optimized performance out of the box
Supports middleware for async operations
Great for complex and frequently changing state

Best Use Cases

Use Redux when:
Large app with lots of global UI state
State updates frequently
-Shopping cart
-Search filters
-Tabs
-Notifications
State is complex and deeply nested
Multiple components need the same state
Async operations are important
-API calls
-Authentication
-Caching

Cons
Requires extra package
Larger bundle size
More setup initially
More concepts to learn

Important Notes
Do NOT use Context API or Redux for Remote State
Remote state means:
Server/API data
Backend data
Cached API responses

Instead use tools like:
TanStack Query
SWR
RTK Query

Simple Rule
Use Context API
When:
Small app
Simple global state
Rare updates

Use Redux
When:
Large app
Complex state
Frequent updates
Many shared states
