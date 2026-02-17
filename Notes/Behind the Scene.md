=======================================================================================

How Components Are Displayed on Screen (React Rendering Process)

Render Triggered → Render Phase → Commit Phase → Browser Paint

1. Render is Triggered
   Happens when state or props are updated.
   Example: setState() or useState update.
   This tells React that something has changed and UI may need updating.

Render Phase (React Internal Process)
React calls component functions.
React calculates what should change in the DOM.
It creates a new Virtual DOM and compares it with the old one (diffing).

⚠️ Important:
No real DOM changes happen here.
No visual update on the screen.
This phase is about decision making, not displaying.

2. Commit Phase
   React applies changes to the real DOM.
   It performs:
   -Insert elements
   -Update elements
   -Delete elements
   This is where actual DOM manipulation happens.

3. Browser Paint
   The browser repaints the screen.
   User finally sees the updated UI.
   This step is handled by the browser, not React.

Important Concept About "Render" in React
👉 In React, rendering does NOT mean updating the DOM or showing UI.
Rendering only happens inside React internally.
It does not produce visual changes directly.
Visual changes appear only after the Commit Phase + Browser Paint.

✅ Key Takeaways
React rendering is a logical process, not visual.
DOM updates happen only in the Commit Phase.
Browser handles the final display.
State updates are the main trigger for rendering

👉 Render is NOT Immediate
React does not render instantly after a state update.
Instead, rendering is scheduled.
React waits until the JavaScript engine is free (not busy executing other tasks).

=============================================================================================

React Rendering, Reconciliation & Fiber — Complete Notes

1. The Render Phase — High Level Flow

Render is triggered when:
-State changes (setState, useState)
-Props change
-Parent component re-renders

Render Phase Flow
Component Instances → React Elements → New Virtual DOM → Reconciliation + Diffing → Updated Fiber Tree

Step-by-Step
1️⃣ Component Instances Trigger Re-render
-Only components affected by state/props update are re-rendered.
-React re-executes component functions.

2️⃣ React Elements Are Created
-JSX is converted into React Elements (plain JS objects).
-These describe what UI should look like.

3️⃣ New Virtual DOM Is Built
-React creates a new Virtual DOM tree.
-This represents updated UI structure in memory.

4️⃣ Current Fiber Tree Exists (Old UI)
Fiber tree stores previous UI state.
It contains:
-Component info
-DOM references
-Hooks
-State & props

5️⃣ Reconciliation + Diffing (Fiber Reconciler)
React compares:
-Old Fiber Tree
-New Virtual DOM
Finds minimal changes required.

6️⃣ Updated Fiber Tree Is Created
New Fiber Tree contains:
-What to insert
-What to update
-What to delete

2. What is Reconciliation & Why Do We Need It?

Why Not Update Whole DOM on Every Change?
Because it is:
🚫 Inefficient and Wasteful
1️⃣ Writing to DOM is Slow
DOM operations are expensive.

2️⃣ Usually Only Small UI Part Changes
Example:
Modal opens → Only modal changes
Button text changes → Only text changes
Updating full DOM is unnecessary.

React Solution: Reconciliation❤️
Definition:Reconciliation is the process of deciding which DOM elements actually need to be inserted, updated, or deleted.

Goal of Reconciliation
-Reuse existing DOM
-Apply minimum changes
-Improve performance

Example: Modal Open:
showModal = true
-Only modal UI is created
-Rest of UI remains unchanged
-React avoids full re-render of DOM

3. The Reconciler — Fiber Architecture

What Is Fiber Tree?
Fiber Tree is React’s internal data structure.

It contains:
One fiber node per:
-Component
-DOM element

Fibers Are NOT Recreated Every Render

4. Reconciliation in Action (Practical Example)

Initial State:
showModal = true

Tree structure:
App
├── Video
├── Modal
│ └── Overlay
│ ├── h3
│ └── button
└── Btn

State Update
showModal = false

New Virtual DOM Created
App
├── Video
└── Btn

Modal is removed.

Reconciliation + Diffing Happens
React compares:
-Current Fiber Tree
-New Virtual DOM

5. Render Phase Final Output
   Render Phase Produces:
   List of Effects (DOM Update Instructions)

Includes:
-Insert operations
-Update operations
-Delete operations

Render Phase Final Flow:

Components Run
↓
New Virtual DOM
↓
Reconciliation + Diffing
↓
Updated Fiber Tree
↓
List of DOM Updates

6. Key Summary (Quick Revision)

   🔁 Complete Rendering Pipeline:
   State Change
   ↓
   Render Phase (Calculation)
   ↓
   Reconciliation (Diffing)
   ↓
   Fiber Tree Updated
   ↓
   DOM Update List Created
   ↓
   Commit Phase (DOM Changes)
   ↓
   Browser Paint (UI Visible)

====================================Render Phase - Recap ===================================================

React Rendering Process – Complete Flow

React updates UI in 4 main steps:
-Trigger Phase
-Render Phase
-Commit Phase
-Browser Paint

1. Trigger Phase
   This phase starts the rendering process.
   Trigger happens when:
   -Initial page load
   -State update (setState, useState)
   -Props change

2) Render Phase (Reconciliation Phase)
   This phase is handled by React Core.
   What happens:
   -React creates a new Virtual DOM
   -Compares it with the current Fiber Tree
   -Performs Diffing (Reconciliation)
   -Finds what exactly changed
   -Prepares a list of DOM updates

Important Points:
👉 Does NOT update real DOM
👉 Does NOT show anything on screen
👉 Only calculates changes

Render Phase Features
✔ Asynchronous
✔ Can be paused
✔ Can be resumed
✔ Can be prioritized
✔ Work can be split into chunks

This makes React fast and responsive.

Component Behavior:
Rendering a parent component automatically renders all child components
Even if child UI does not change, render logic runs

Output of Render Phase
At the end of render phase React produces:
➡ Updated Fiber Tree
➡ List of DOM Updates

3. Commit Phase
   This phase is handled by Renderers like:
   -ReactDOM (Web)
   -React Native (Mobile)
   -Remotion (Video)
   -Others...

What happens:
👉 React writes changes to the REAL DOM
👉 Inserts nodes
👉 Deletes nodes
👉 Updates attributes

Important Properties:
✔ Synchronous
✔ Cannot be interrupted
✔ Happens in one go

After Commit Phase:
-The workInProgress Fiber Tree
-Becomes the Current Fiber Tree
-Ready for next render cycle

4. Browser Paint Phase
   Handled by the Browser (Chrome, Firefox, Safari, Edge)
   What happens:
   -Browser reads updated DOM
   -Calculates layout
   -Paints pixels
   -Shows updated UI on screen

====================================================

How Diffing Works

Rule 1: Different Element Type = New Tree
If element type changes at same position:

Ex. <div> → <header>

Result:
-React destroys old subtree
-Removes old component & state
-Creates new subtree
-State is RESET

Rule 2: Same Element Type = Reuse Tree
If same element type at same position:
Example:

<div class="hidden"> → <div class="active">

Result:
-Same DOM element reused
-Only attributes/props updated
-Component state is preserved

Stable key Prop Rule:
Elements with same key are preserved across renders
Helps React track list items efficiently
Prevents unwanted re-renders

When Same Position Has Different Element:
Example:
<SearchBar /> → <ProfileMenu />

Result:
-Old component destroyed
-New component created
-State lost
-Subtree rebuilt

When Same Position Has Same Element:
<SearchBar wait={1}>
<SearchBar wait={5}>

Result:
-Same component reused
-Only props updated
-State preserved

======================================================================
React Key Prop – Notes
🔹 What is the Key Prop?
Key is a special prop in React used to help the diffing (reconciliation) algorithm identify which elements are unique.

It helps React distinguish between multiple instances of the same component type.

🔹 Why is Key Important?
✅ Improves Performance
React uses keys to efficiently update only the required elements instead of re-rendering everything.

🔹 Behavior of Key Prop
✔ When Key Stays the Same:
-The element is kept in the DOM.
-React reuses the existing component.
-This happens even if the element’s position in the tree changes.
-State inside the component is preserved.

❌ When Key Changes:
-The old element is destroyed.
-A new element is created.
-Component state is reset.
-Happens even if the element’s position remains the same.

🔹 Common Use Cases
1️⃣ Using Keys in Lists
Keys help React track items when rendering lists.
Prevents UI bugs and unnecessary re-renders.
Example:
items.map(item => (

  <li key={item.id}>{item.name}</li>
))

2️⃣ Using Keys to Reset State
-Changing the key forces React to recreate the component.
-Useful when you want to reset form fields or component state.
Example:
<Component key={userId} />

🔹 Summary Points
-Key uniquely identifies React elements.
-Helps React optimize DOM updates.
-Same key → component reused.
-Different key → component recreated.

============================================================================

Two Types of Logic in React Components:
-React components contain two main types of logic:

1. What is Render Logic?
   -Code written at the top level of the component
   -Used to describe UI structure
   -Returns JSX
   -Runs every time the component renders

2. Event Handler Functions
   What are Event Handlers?
   Functions triggered by user actions
   Executed only when an event happens
   Examples of Events:
   onClick, onChange, onSubmit, onKeyPress

What Event Handlers Do:
✔ Update state
✔ Make API calls
✔ Read input values
✔ Navigate pages
✔ Perform side effects

Example:
function handleClick() {
setCount(count + 1);
}

🟦 Rules for Render Logic
React enforces strict rules for render logic 👇

Rule 1: Render Logic Must Be Pure
Same input (props + state) → Same output (JSX)

Rule 2: No Side Effects Allowed
Render logic must NOT interact with outside world.
-Do NOT do these in render logic:
1.No API Calls
2.No Timers
3.No Direct DOM Access
4.No External Mutation
5.No State Updates
⚠ Causes infinite re-render loop

Where Are Side Effects Allowed?
✅ Event Handlers

Side effects are allowed and recommended here:
✔ API calls
✔ State updates
✔ DOM interactions
✔ Navigation
✔ Local storage

✅ useEffect Hook

React provides a special hook for side effects:

useEffect(() => {
fetchData();
}, []);

Used for:
-API calls
-Subscriptions
-Timers
-DOM operations

👉 Render = What UI looks like
👉 Event Handler = What UI does

1. RENDER LOGIC
   👉 Code that lives at the top level of the component function
   👉 Participates in describing how the component view looks like
   👉 Executed every time the component renders

2. EVENT HANDLER FUNCTIONS
   👉 Executed as a consequence of the event that the handler is listening for (change event in this example)
   👉 Code that actually does things: update state, perform an HTTP request, read an input field, navigate to another page, etc.

=================================================================================
State Batching in React:

What is State Batching?
State batching means React groups multiple state updates together and performs only one render instead of many.

Why React Uses Batching?

React batches state updates to:
-Improve performance
-Reduce unnecessary re-renders
-Make UI updates faster
-Optimize DOM updates

✅ Example
setCount(count + 1);
setAge(age + 1);
setScore(score + 1);

👉 React will:
-Combine all updates
-Trigger one render only

Where Does Batching Happen?

Batching happens automatically in:
-Event handlers (onClick, onChange)
-React lifecycle events
-React 18: also in setTimeout, Promise, fetch callbacks

Important Point
State updates are asynchronous because of batching:
setCount(1);
console.log(count); // old value

👉 Updated value is available after re-render.

===========================================================

Batching In Practice:
the new state was equal to the current state. And so in that situation,
React will not even try to attempt to update the state, and then of course, it will also not re-render the component instance.

Asynchronous State Updates: It emphasizes that state values may not reflect the updated state immediately, as they’ll only display new values in the next render cycle, affecting how re-renders are triggered.

===================================== Framework vs Library ====================================

Framework vs Library, React Ecosystem & React-based Frameworks
Framework

Definition: An all-in-one toolkit (“batteries included”).

Includes by default:
-HTTP requests
-Routing
-Styling
-Form management
Example: Angular,Next.js

Advantages:
-Everything needed to build large apps is included.
-Less setup effort.

Disadvantages:
-Less flexibility.
-Must follow framework rules and conventions.

Library
Definition: Provides specific functionality (“separate ingredients”).
Example: React (View library)

Needs external libraries for:
Routing
HTTP requests
Styling
Form management

Advantages:
-More freedom and customization.
-Choose best tools for your needs.

Disadvantages:
-Decision fatigue.
-More setup and maintenance effort.

React 3rd-Party Library Ecosystem
React focuses mainly on UI. For full applications, developers use external libraries:

🔹 Routing (SPA Navigation)
-React Router
-React Location

🔹 HTTP Requests (API Calls)
-Fetch API
-Axios

🔹 Remote State Management (Server Data)
-React Query
-SWR
-Apollo (GraphQL)

🔹 Global State Management
-Context API
-Redux
-Zustand

🔹 Styling
-CSS Modules
-Styled Components
-Tailwind CSS

🔹 Form Management
-React Hook Form
-Formik

🔹 Animations & Transitions
-Framer Motion
-React Spring

🔹 UI Component Libraries
-Material UI (MUI)
-Chakra UI
-Mantine

Frameworks Built on Top of React
These are opinionated React frameworks that provide built-in tools and structure.

🔹 Popular React Frameworks
Next.js
Remix
Gatsby

Simple Difference

Framework: You work within its rules and structure.
Library: You use it whenever you need functionality.

=====================================================================================

========================== DOM Event Propagation, React Event Handling & Synthetic Events=================

1️⃣ DOM Event Propagation
When an event occurs (like a click), it travels through the DOM tree in three phases:

✅ 1. Capturing Phase (Top → Down)
-Event travels from document → target element
-Also called trickling phase
-Used rarely in normal applications

👉 By default, most event handlers do NOT listen in capturing phase

✅ 2. Target Phase
Event(event object) reaches the actual element that was clicked
Example: Clicking a <button>

✅ 3. Bubbling Phase (Bottom → Up)
-Event bubbles up from target → parent → document
-This is the default behavior used by JavaScript and React

🔴 Stop Bubbling
We can stop event propagation using: event.stopPropagation();

2️⃣ Event Delegation
Event delegation means attaching one event handler to a parent element instead of adding handlers to multiple child elements.

🔹 How It Works
-Add event handler to parent container
-Detect clicked element using event.target
-Perform action if target matches required element

3️⃣ How React Handles Events
React does NOT attach event handlers to every element.
Instead: 👉 React registers all event handlers on the root DOM container
(usually div#root)

4️⃣ Synthetic Events in React
A Synthetic Event is a wrapper around the browser’s native event created by React.

<input onChange={(e) => setText(e.target.value)} />
Here e is a SyntheticEvent, not a native browser event.

=============================================Summary================================================
A component is like a blueprint for a piece of UI that will eventually exist on the screen. When we “use” a component, React creates a component instance, which is like an actual physical manifestation of a component, containing props, state, and more. A component instance, when rendered, will return a React element

“Rendering” only means calling component functions and calculating what DOM elements need to be inserted, deleted, or updated. It has nothing to do with writing to the DOM. Therefore, each time a component instance is rendered and re-rendered, the function is called again

Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component

When a component instance gets re-rendered, all its children will get re-rendered as well. This doesn’t mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders. But all this re-rendering can still have an impact on performance (more on that later in the course 👉)

Diffing is how React decides which DOM elements need to be added or modified. If, between renders, a certain React element stays at the same position in the element tree, the corresponding DOM element and component state will stay the same. If the element changed to a different position, or if it’s a different element type, the DOM element and state will be destroyed

Giving elements a key prop allows React to distinguish between multiple component instances. When a key stays the same across renders, the element is kept in the DOM. This is why we need to use keys in lists. When we change the key between renders, the DOM element will be destroyed and rebuilt. We use this as a trick to reset state

Never declare a new component inside another component! Doing so will re-create the nested component every time the parent component re-renders. React will always see the nested component as new, and therefore reset its state each time the parent state is updated

The logic that produces JSX output for a component instance (“render logic”) is not allowed to produce any side effects: no API calls, no timers, no object or variable mutations, no state updates. Side effects are allowed in event handlers and useEffect (next section 👉)

The DOM is updated in the commit phase, but not by React, but by a “renderer” called ReactDOM. That’s why we always need to include both libraries in a React web app project. We can use other renderers to use React on different platforms, for example to build mobile or native apps

Multiple state updates inside an event handler function are batched, so they happen all at once, causing only one re-render. This means we can not access a state variable immediately after updating it: state updates are asynchronous. Since React 18, batching also happens in timeouts, promises, and native event handlers.

When using events in event handlers, we get access to a synthetic event object, not the browser’s native object, so that events work the same way across all browsers. The difference is that most synthetic events bubble, including focus, blur, and change, which do not bubble as native browser events. Only the scroll event does not bubble

React is a library, not a framework. This means that you can assemble your application using your favorite third-party libraries. The downside is that you need to find and learn all these additional libraries. No problem, as you will learn about the most commonly used libraries in this course
