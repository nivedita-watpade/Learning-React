====================================== custom Hookes ==================================

React Hooks are special built-in functions that allow us to “hook into” React internals.
🔹 What Hooks Allow Us To Do:
-Create and access state (from Fiber tree)
-Register side effects
-Perform manual DOM selections
-And many more features

🔹 Naming Rule
-Hooks always start with use
-Example: useState, useEffect

🔹 Why Hooks Are Powerful
-Enable reusing non-visual logic
-Allow creation of custom hooks
-Let function components:
-Own state
-Run side effects at different lifecycle points

-Before React v16.8 → this was only possible in class components

🥇 Most Used Hooks
-useState
-useEffect
-useReducer
-useContext

📜 Less Used Hooks
-useRef
-useCallback
-useMemo
-useTransition
-useDeferredValue

❌ Will not learn
-useLayoutEffect
-useDebugValue
-useImperativeHandle
-useId

THE RULES OF HOOKS
1️⃣ Only Call Hooks at the Top Level

❌ Do NOT call hooks:
-Inside conditionals
-Inside loops
-Inside nested functions
-After an early return

✅ Why?
Hooks must always be called in the same order on every render.

======================================

Only Call Hooks at the Top Level

❌ Don’t call hooks inside:
-loops
-conditions
-nested functions
-after return statements

"What are the rules of hooks?"
Ans:
Hooks must be called at the top level and only inside React function components or custom hooks.
We cannot call them inside loops, conditions, or nested functions because React depends on the consistent order of hook calls between renders.

===================== initializing state with callback (lazy initial state) in react ===========

Initializing State with Callback (Lazy Initial State) in React

In React, when using useState, you can pass:

1. A direct value
2. A function that returns a value (lazy initialization)

🔹 Normal Initialization
const [count, setCount] = useState(0);
Here, 0 is set immediately during every render (initial render + re-renders).

🔹 Lazy Initial State (Using Callback)
Ex. const [count, setCount] = useState(() => {
console.log("Calculating initial state...");
return 0;
});

👉 React calls this function only once — during the initial render.
It does NOT call it on re-renders.

📌 Example 2: localStorage (Very Common Interview Example)
const [name, setName] = useState(() => {
const savedName = localStorage.getItem("name");
return savedName ? savedName : "";
});

✔ localStorage is accessed only once
✔ Better performance

🎤 How to Answer in Interview (Polished Version)

Lazy initialization in React means passing a function to useState so that the initial state is computed only once during the first render. It is useful when the initial value requires expensive computation or reading from localStorage, improving performance by preventing recalculation on every render.

================================ useRef ========================================

📌 What Are Refs?
🔹 Ref with useRef
A ref is a box (object) with a mutable .current property.
The value inside .current persists across renders.
Unlike normal variables, refs are NOT reset on every render.
Ex. const myRef = useRef(23);
👉 The ref object looks like:

{
current: 23
}

You can read and write like this:
myRef.current = 1000;

🔹 Two Main Use Cases of Refs
1️⃣ Store a value that stays the same between renders
Examples:
-Previous state value
-setTimeout ID
Any mutable value that should not trigger re-render

2️⃣ Select and store DOM elements
Used for:
-Focusing an input
-Accessing element properties
-Measuring DOM elements

🔹 Important Rules About Refs
Refs are for data that is NOT rendered.
Usually used inside:
-Event handlers
-useEffect

❌ Do NOT read/write .current inside render logic.
If data affects UI → Use state instead of ref.

📌 State vs Refs
Feature State Refs
Persists across renders
✅ Yes == State
✅ Yes == Refs

Updating causes re-render
✅ Yes == State
❌ No == Refs

Immutable
✅ Yes == State
❌ No (mutable) == Refs

Asynchronous updates
✅ Yes == State
❌ No == Refs

🔹 Key Differences
✅ State
-Updating state triggers re-render.
-State is immutable.
-Updates are asynchronous.
-Used for UI-related data.

✅ Refs
-Updating .current does NOT trigger re-render.
-Mutable.
-Synchronous updates.
-Used for non-UI data and DOM access.

==================== Reusing Logic with Custom Hooks (React Notes)=======================

🔹 Why Custom Hooks?
Used to reuse non-visual logic across multiple components.
Helps separate:
-UI (presentation)
-Logic (behavior / state / effects)

🧠 Decision Flow
When you want to reuse logic:
👉 Does the logic contain React hooks?
❌ NO → Use a Regular JavaScript Function
✅ YES → Create a Custom Hook

🪝 What is a Custom Hook?
A custom hook is:
-A JavaScript function
-That uses one or more React hooks
-And starts with use

Example:
function useFetch(url) {
const [data, setData] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(function () {
fetch(url)
.then((res) => res.json())
.then((res) => setData(res));
}, []);

return [data, isLoading];
}

1️⃣ Function Name Rule
Must start with use:
✅ useFetch
✅ useAuth
❌ fetchData

2️⃣ Must Use Hooks Inside
A custom hook must use:
-useState
-useEffect
-useReducer
etc.
If it doesn’t use hooks → it’s just a regular function.

3️⃣ Can Return Anything
Unlike components:
Custom hooks can return:
Array → [data, isLoading]
Object → { data, isLoading }
Any value

4️⃣ Single Responsibility Principle
A custom hook should have one purpose
Makes it:
-Reusable
-Portable
-Easy to maintain
-Even reusable across projects

5️⃣ Rules of Hooks Apply
Custom hooks must follow:
Only call hooks at the top level
Only call hooks inside:
-React components
-Other custom hooks
