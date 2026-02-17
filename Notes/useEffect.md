======================================= COMPONENT (INSTANCE) LIFECYCLE ===================================

1. MOUNT / INITIAL RENDER
   👉 Component instance is rendered for the first time
   👉 Fresh state and props are created

2. RE-RENDER (Optional)
   HAPPENS WHEN:
   👉 State changes
   👉 Props change
   👉 Parent re-renders
   👉 Context changes

3. UNMOUNT
   👉 Component instance is destroyed and removed
   👉 State and props are destroyed

============================= useEffect ===============================

What is useEffect?
useEffect is a React Hook used to perform side effects in functional components.

👉 Side effects examples:
-Fetching data from an API
-Updating the DOM
-Setting timers
-Adding event listeners
-Subscribing/unsubscribing

syntax:
useEffect(() => {
// side effect code
}, [dependencies]);

It takes two arguments:
-Callback function → runs your logic
-Dependency array → controls when effect runs

Ex. useEffect(function () {
fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
.then((res) => res.json())
.then((data) => setMovies(data.Search));
}, []);

✅ Step-by-Step Explanation
1️⃣ When does this useEffect run?
-Because dependency array is empty ([]):
👉 This means:
-Runs only once
-After first render (component mount)
-Similar to componentDidMount in class components

✅ Important Points (Interview Notes)
🔹 1. useEffect runs AFTER render
React first renders UI
Then useEffect executes

================================= First look at effects ===========================

✅ WHERE TO CREATE SIDE EFFECTS (React)
What is a Side Effect?
A side effect is any interaction between a React component and the outside world.

Examples of Side Effects:
-Fetching data from API
-Setting timers (setTimeout, setInterval)
-Subscriptions (WebSocket)
-Accessing DOM manually
-Local storage operations

👉 In simple words:
Side effect = Code that actually DOES something outside rendering UI

❌ Where Side Effects Should NOT Be Written
-Side effects should NOT be written inside render logic.
-Rendering should only focus on UI.
⚠️ Side effects should NOT be written inside render logic.

✅ Two Places to Create Side Effects
1️⃣ Event Handlers
2️⃣ Effects (useEffect)

✅ EVENT HANDLERS
Triggered by user actions.
Examples:onClick, onSubmit, onChange

Ex. function handleClick() {
fetch("http://www.omdbapi.com/?s=inception")
.then(res => res.json())
.then(data => setMovies(data.Search));
}

👉 Characteristics of Event Handlers
✔ Runs when event happens
✔ Used to react to user interaction
✔ Preferred way when possible
✔ Manual trigger

✅ EFFECTS (useEffect)
Triggered by rendering, not user action.

Ex.
useEffect(() => {
fetch("http://www.omdbapi.com/?s=inception")
.then(res => res.json())
.then(data => setMovies(data.Search));

return () => console.log("Cleanup");
}, []);

👉 Characteristics of useEffect
✔ Runs after component renders
✔ Runs on mount, re-render, unmount
✔ Controlled by dependency array
✔ Keeps component synchronized with external systems
✔ Automatic execution

✅ Cleanup Function
Returned function inside useEffect
Ex.
return () => {
console.log("Cleanup");
};

Used For:
✔ Removing event listeners
✔ Clearing timers
✔ Canceling subscriptions
✔ Preventing memory leaks

👉 Both Event Handlers and Effects can produce the SAME result
👉 But they run at DIFFERENT TIMES

============================= with async ===============================================

with async

✅ Can We Make useEffect async?

❌ NO — You cannot directly make useEffect async.

❌ Wrong Way:
useEffect(async () => {
const res = await fetch(url);
}, [])

Why NOT allowed?
Because:
-useEffect must return nothing or a cleanup function
-Async function always returns a Promise
-React does not accept Promise as cleanup

Correct Way
👉 Create an async function INSIDE useEffect and call it.

useEffect(function () {
async function fetchMovies() {
const res = await fetch(
`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`,
);
const data = await res.json();
setMovies(data.Search);
console.log(data.Search);
}
fetchMovies();
}, []);

Step 1:
useEffect runs after component renders

Step 2:
Async function is created inside effect

Step 3:
Function is called

Step 4:
API is fetched

Step 5:
State is updated

Step 6:
Component re-renders with new data

=========================================== useEffect Dependency Array =======================

useEffect Dependency Array
What is the dependency array?
-By default, useEffect runs after every render
-We can control when an effect runs by passing a dependency array
-Without the dependency array, React doesn’t know when the effect should re-run

How it works
-The effect runs again every time one of the dependencies changes
-Every state variable and prop used inside the effect MUST be included in the dependency array
-Missing dependencies can cause a stale closure (effect uses outdated values)

useEffect(() => {
document.title = title;
}, [title]);

useEffect as a Synchronization Mechanism
Core idea
useEffect synchronizes React state/props with external systems

External systems include:
Browser APIs (document title, localStorage)
Network requests
Timers, subscriptions
Mental model

Think of useEffect as an event listener
It listens for dependency changes
When a dependency changes → effect runs again

Effects are Reactive
Effects react to changes in:
-State
-Props

Just like UI re-renders when state changes, effects re-run when dependencies change
Ex.
useEffect(() => {
document.title = `${title} (Rated ${userRating})`;
}, [title, userRating]);

If title changes → effect runs
If userRating changes → effect runs

Synchronization Flow
State / Props change
↓
Component re-renders
↓
Effect runs again
↓
External system is updated

\*React state → Browser tab title\*\

Dependency Array Patterns
-With dependencies
useEffect(fn, [x, y, z]);
Runs:
-On initial render
-Whenever x, y, or z changes
Synchronizes with specific values

Empty dependency array
useEffect(fn, []);

Runs only once
Equivalent to componentDidMount
Used for:
-Initial data fetching
-One-time setup

No dependency array
useEffect(fn);
-Runs after every render
-Usually bad for performance
-Can cause infinite loops

Effects and Component Lifecycle
When are effects executed?

Mount (initial render)
-Render
-Commit
-Browser paint
-Effect runs

Update (dependency changes)
-Re-render
-Commit
-Browser paint
-Effect runs again

Unmount
Cleanup function runs (if provided)

useEffect(() => {
return () => {
// cleanup
};
}, []);

useEffect vs useLayoutEffect
useEffect
-Runs after browser paint
-Non-blocking
-Most commonly used

-useEffect is not about lifecycle, it’s about synchronization
-Dependency array controls when the effect runs
-Always include all used state and props in dependencies
-Empty array → run once
-No array → run on every render
-Incorrect dependencies → stale data bugs

=================================The Cleanup Function (React – useEffect)=============================

🔹 What is a Cleanup Function?
-A function that we return from a useEffect hook.
-It is optional, but often necessary.
Ex.
useEffect(() => {
// effect logic

return () => {
// cleanup logic
};
}, []);

🔹 When Does the Cleanup Function Run?
It runs in two situations:

1️⃣ Before the effect runs again
When dependencies change
React cleans up the previous effect before running the new one.

2️⃣ After the component unmounts
When the component is removed from the DOM
Prevents memory leaks

🔹 Component Lifecycle Flow
🔄 Component renders
→ Effect runs (if dependency array changed)

❌ Component unmounts
→ Cleanup function executes

🔹 Common Examples
Effect Cleanup
HTTP request ===> Cancel request
API subscription ===> Cancel subscription
Start timer (setInterval) ===> Stop timer (clearInterval)
Add event listener ===> Remove event listener

Key Points:
✅ Each useEffect should handle only one side effect
✅ Use one useEffect per side effect
✅ Makes cleanup easier and code more maintainable

=============================== Abort Controller ===================================

AbortController is a built-in Web API used to cancel asynchronous operations, mainly:
-fetch() API requests
-Streams
-Some other async tasks that support abort signals

It helps prevent:
-Memory leaks
-Unnecessary API calls
-State updates after component unmount (very important in React)

Ex.
useEffect(() => {
const controller = new AbortController(); //use abortcontroller

    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,  //use abortcontroller
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        }
      });

    return () => {
      controller.abort(); // cleanup -  //use abortcontroller
    };

}, []);
