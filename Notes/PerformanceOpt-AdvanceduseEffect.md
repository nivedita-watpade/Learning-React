Performance Optimization & Advanced useEffect

When does a component instance re-render?
A React component re-renders only in 3 situations:

1. 🔄 State Changes
   When component’s state updates
   Example: useState, useReducer
   ✅ Most common reason for re-render

2. 🌐 Context Changes
   -When a value from Context API changes
   -All consuming components will re-render

3. 👨‍👩‍👧 Parent Re-renders
   -When the parent component re-renders, child components also re-render
   ❗ Even if props didn’t change

👉 Changing props does NOT directly cause re-render
-Props change because parent re-rendered
-So actual reason = parent re-render, not props themselves

💡 Key Concept
🖥️ Render ≠ DOM Update
A render means:
-Component function is called again
-It does NOT always mean DOM changes

🚫 Wasted Render
A render that does not change the DOM
Happens when:
-Same UI output is returned

⚡ Performance Insight
Usually NOT a problem (React is fast)
Becomes a problem when:
-Too many re-renders
-Heavy/slow components

================================ Understanding memo =================================

🔹 What is Memoization?
An optimization technique that:
-Executes a function once
-Stores (caches) the result in memory

If called again with same inputs, it:
✅ Returns cached result
❌ Does NOT re-execute function

🔹 Why use Memoization?
🚫 Prevent unnecessary calculations
⚡ Improve performance
🔁 Avoid repeated work

⚙️ How it works

1. Call function → calculate result
2. Store result in cache
3. Call again:
   -Same inputs → return cached result
   -New inputs → recalculate

⚛️ Memoization in React

1️⃣ memo (Component Memoization)
-Used to prevent re-rendering of components
-Component re-renders ONLY when props change
✅ Use case:
When parent re-renders frequently but props remain same

🔹 Behavior
❌ Without memo:
-Parent re-renders → Child also re-renders (always)

✅ With memo:
Parent re-renders:
Same props → ❌ Child does NOT re-render
New props → ✅ Child re-renders

==================================== React memo ================================

⚠️ Issue with React.memo

🔹 Problem
In React, everything is recreated on every render
Objects → {}
Functions → () => {}

🔹 JavaScript Behavior
Even if they look same:
{} !== {}
() => {} !== () => {}

👉 They are different references

🔹 What goes wrong?
If you pass objects/functions as props:
<Child data={{ name: "John" }} />

On every render:
-New object is created
-Child sees it as new prop
-❌ React.memo fails

🔹 Result
Props change every time →
❌ Memoization does NOT work
❌ Child re-renders again

✅ Solution

👉 Make props stable (same reference) using:
1.useMemo → for values/objects
2.useCallback → for functions

⚛️ useMemo & useCallback
🔹 Purpose
-useMemo → memoize values
-useCallback → memoize functions

🔹 How they work
-Store value in memory (cache)
-Return same value on next render if dependencies don’t change

🔹 Dependency Array (VERY IMPORTANT)
Works like useEffect
If dependency changes → value/function is recreated
If same → cached value is returned

✅ With useMemo
Same dependencies → cached value returned
Changed dependencies → new value created

🎯 3 Important Use Cases:
1️⃣ Prevent wasted renders (with React.memo)
Stabilize props passed to child

2️⃣ Avoid expensive recalculations
Example:
const sortedData = useMemo(() => heavySort(data), [data]);

3️⃣ Stable dependencies (Very Important 🔥)
Used inside useEffect dependency array
👉 Prevents:
Infinite loops
Unnecessary effect runs

================= useMemo ====================================

🔹 useMemo in React (Simple + Interview Ready)
useMemo is a React Hook used to optimize performance by memoizing (caching) the result of a calculation.

Ex. const achiveOptions = useMemo(() => {
return {
show: false,
title: `Post archive in addition to ${posts.length} main posts`,
};
}, [posts.length]);

🧠 What it does
-Runs the function only when dependencies change
-Returns the cached value if dependencies are same
-Helps avoid unnecessary recalculations

🚀 When to use useMemo
Use it when:
-You have expensive calculations (loops, filtering, sorting)
-Prevent unnecessary recomputation
-Optimize large lists / heavy UI

====================== useCallback ====================================

🔹 useCallback in React (Simple + Interview Ready)
useCallback is a React Hook used to memoize a function, so it is not recreated on every render.

📌 Syntax
const memoizedFunction = useCallback(() => {
// function logic
}, [dependencies]);

🧠 What it does
-Returns the same function reference if dependencies don’t change
-Prevents unnecessary re-creation of functions
-Useful for performance optimization

====================================== Lazy Loading =============================

In React, lazy loading + Suspense is used to improve performance by loading components only when needed, instead of loading everything at once.

🔹 What is Lazy Loading?

Lazy loading means:
👉 Load components on demand (dynamically) instead of at initial render.

React provides:
➡️ React.lazy() for this purpose

🔹 What is Suspense?
👉 Suspense is a wrapper component
👉 It shows a fallback UI (like loading spinner) while the lazy component is being loaded

import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

```js
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<h2>Loading page...</h2>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

🔹 How it works (Interview Explanation)
-React.lazy() → splits bundle (code splitting)
-Component is loaded only when rendered
-Suspense → handles loading state

=========================================================================

useEffect Dependency Array – Rules

✅ 1. Always include all reactive values
Include:
-State (useState)
-Props
-Context values
If a value is used inside useEffect → it must be in dependency array

👉 Example:
useEffect(() => {
console.log(count);
}, [count]); // ✅ correct

✅ 2. Include all “reactive values”

Reactive values = anything that depends on state/props
-Variables derived from state
-Functions using state

❗ 3. Never ignore ESLint exhaustive-deps rule
-It tells you correct dependencies
-Ignoring it = bugs + stale values

❌ 4. Avoid objects & arrays as dependencies
-Because they are recreated on every render
-React sees them as new values
useEffect(() => {}, [{}]); // ❌ wrong

✔ Fix:
Use primitives OR memoize (useMemo)

🔁 Same rules apply to:
-useMemo
-useCallback

🧹 Removing Unnecessary Dependencies

🔧 1. Function dependencies
✔ Move function inside useEffect
useEffect(() => {
function fetchData() {}
fetchData();
}, []);

✔ Use useCallback if reused
const fetchData = useCallback(() => {}, []);

✔ Move outside component if no reactive values

📦 2. Object dependencies
❌ Avoid:
useEffect(() => {}, [user]);

✔ Use specific properties:
useEffect(() => {}, [user.name, user.age]);

🎯 3. Other strategies
Use useReducer for multiple related states
Do NOT include:
-setState
-dispatch

👉 React guarantees they are stable

⚠️ When NOT to use useEffect
👉 Think of useEffect as a last resort (escape hatch)

======================================================================

🚫 Overused Cases
❌ 1. Handling user events

Bad:
useEffect(() => {
if (clicked) doSomething();
}, [clicked]);

✔ Good:
<button onClick={doSomething} />

❌ 2. Fetching data on mount (basic apps only)
Works in small apps
In real apps → use libraries like:
-React Query
-SWR

❌ 3. Syncing state with another state
Bad:
useEffect(() => {
setFullName(first + last);
}, [first, last]);

✔ Better:
const fullName = first + last;

👉 Use derived state instead

🧾 Quick Summary (Interview Gold)
-Always include all dependencies
-Never ignore ESLint warnings
-Avoid objects/functions unless memoized
Prefer:
-Derived state
-Event handlers
-useEffect = side effects only (API calls, subscriptions, DOM updates)

=================================== Closures in useEffect ==================================

A closure is when a function “remembers” variables from its outer scope even after the outer function has finished.

Closure in React useEffect:
In React, closures happen naturally because functions capture state/props at render time.
Ex.

function Counter() {
const [count, setCount] = useState(0);

useEffect(() => {
console.log("Count:", count);
}, []);

return <button onClick={() => setCount(count + 1)}>Click</button>;
}

👉 Here:
useEffect runs only once
It captures count = 0 (initial value)

A stale closure means:
A function keeps using an old value of state/props instead of the latest one.

Why Stale Closure Happens?

Because:
-React re-renders component
-But useEffect with [] runs only once
-So it doesn’t get updated state

How to Fix Stale Closure
✅ Solution 1: Add Dependency

✅ Solution 2: Use Functional Update
setCount(prev => prev + 1);
👉 Always gets latest value
