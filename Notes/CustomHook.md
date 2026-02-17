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
