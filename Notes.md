React Notes:
|| Ganpati Bappa Morya: ||

import { useState, useEffect } from "react";

export default function App() {
const [advice, setAdvice] = useState(""); // To update the UI
const [count, setCount] = useState(0);
async function getAdvice() {
const res = await fetch("https://api.adviceslip.com/advice");
console.log(res);
if (!res || res.status === 404) {
setAdvice("Failed");
return;
}
const data = await res.json();
console.log(data);
if (!data) return;
console.log(data.slip.advice);

    // setCount(count + 1);

    if (advice === data.slip.advice) {
      return;
    } else {
      setAdvice(data.slip?.advice ?? "Default Value");
      setCount((c) => c + 1);
    }

}

// To load any data initially
useEffect(function () {
getAdvice();
}, []);

return (

<div>
<h1>{advice}</h1>
<button onClick={getAdvice}>Get Advice</button>
<Message adviceCount={count} default="Default Value" />
</div>
);
}

//Props: To pass parent data to the child
function Message(props) {
console.log(props);
return <p>Count: {props.adviceCount}</p>;
}

======== Server Side & Client Side Rendering ===================

Client-Side Rendering (CSR)
Definition:
In Client-Side Rendering, the browser (client) downloads a mostly empty HTML file and then uses JavaScript to render the content dynamically.

Server-Side Rendering (SSR)
Definition:
In Server-Side Rendering, the server prepares and sends a fully rendered HTML page for each request.

========================== Strict Mode ===============

Its redenders component twice and gives warning if we used any depricated API's

========================== Components ===============

👉 React applications are entirely made out of components

👉 Building blocks of user interfaces in React

👉 Piece of UI that has its own data, logic, and appearance (how it works and looks)

👉 We build complex UIs by building multiple components and combining them

👉 Components can be reused, nested inside each other, and pass data between them

================== Creating and Reusing Components ==================

In react, we create component using function

Rules:

- Component name should always start with uppercase.
- Component should return JSX or Null

============================== JSX ===============================

JSX:
👉 Declarative syntax to describe what components look like and how they work

👉 Components must return a block of JSX

👉 Extension of JavaScript that allows us to embed JavaScript, CSS, and React components into HTML

👉 Each JSX element is converted to a React.createElement function call

👉 We could use React without JSX

React is Declarative : In this case, Tell JSX what to display on the UI not how to display or update it.

Imperative: We have to manually select DOM elements and updated DOM properties.

========================== Styling React Component ===================================

<h1 style={{ fontSize: "48px", color: "red", textTransform: "uppercase" }}>Fast React Pizza Co.</h1>

Adding classes: We have className instead of class in react JS. Because class is a reserved keyword.

<header className="header"></header>

======================== Props in React JS =====================

Definition:
Props (short for properties) are used in React to pass data from one component to another, typically from a parent component to a child component. They make components reusable and dynamic.

// Parent Component
function App() {
return (

<div>
<Greeting name="Nivedita" />
<Greeting name="Pranit" />
</div>
);
}

// Child Component
function Greeting(props) {
return <h2>Hello, {props.name}!</h2>;
}

export default App;

//Hello, Nivedita!
Hello, Pranit!

👉 Props are used to pass data from parent components to child components (down the component tree)

👉 Essential tool to configure and customize components (like function parameters)

👉 With props, parent components control how child components look and work

👉 Anything can be passed as props: single values, arrays, objects, functions, even other components

In React, props are read-only — meaning that a component must never modify its own props.
They are meant to be immutable inside the child component. If you need to change data, you do it at the parent level and pass new props down.

Props are not updated by the child. Only parent can update it

One-way data flow (also called unidirectional data flow) means that data in React always flows in a single direction — from parent components down to child components via props.

======================= Rules of JSX =========================
GENERAL JSX RULES

👉 JSX works essentially like HTML, but we can enter “JavaScript mode” by using {} (for text or attributes).
👉 We can place JavaScript expressions inside {}.
Examples: reference variables, create arrays or objects, [].map(), ternary operator.
👉 Statements are not allowed (if/else, for, switch).
👉 JSX produces a JavaScript expression
const el = <h1>Hello React!</h1>;
const el = React.createElement("h1", null, "Hello React!");
1️⃣ We can place other pieces of JSX inside {}.
2️⃣ We can write JSX anywhere inside a component (in if/else, assign to variables, pass it into functions).
👉 A piece of JSX can only have one root element. If you need more, use <React.Fragment> (or the short <>).

============================= Rendering list (Using map() method) ======================

In React, rendering a list means displaying multiple elements (like items, cards, or components) by looping over an array and creating JSX elements for each item.

1. What is JSX Array Rendering
   React can render an array of JSX elements directly inside the component’s return statement.
   Each element in that array is treated as part of the UI.

Ex.
function App() {
const fruits = ['Apple', 'Banana', 'Mango'];

// Create an array of JSX elements using map()
const fruitList = fruits.map((fruit, index) => (

<li key={index}>{fruit}</li>
));
return (
<ul>{fruitList}</ul> // React renders the array of <li> elements
);
}

export default App;

2. Why We Use map()
   The .map() method is used to loop through an array and return a new array of JSX elements.
   React then renders each of those JSX elements.
   Ex.
   function App() {
   const users = ['Nivedita', 'Ravi', 'Priya'];

return (

<div>
<h2>User List</h2>
<ul>
{users.map((user, index) => (
<li key={index}>{user}</li>
))}
</ul>
</div>
);
}

================================= Conditional Rendering With Ternaries =======================

Conditional Rendering with && in React JS

In React, you can use the logical AND (&&) operator to conditionally render elements — this is a short and simple way to render something only if a condition is true.
Ex.
{isLoggedIn && <p>You are logged in.</p>}

If isLoggedIn is true → it shows: You are logged in.
If isLoggedIn is false, React ignores the element (renders nothing bcoz react do not renders boolean values).

Note: React do not renders boolean values

=============================== Conditional Rendering With Ternaries ==================================

In React, ternary operators are a concise way to render components or elements conditionally — that is, to show one thing or another based on a condition.

function Greeting({ isLoggedIn }) {
return (

<div>
{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
</div>
);
}

============================= Fragment in js ==============================

In React JS, a Fragment is a feature that lets you group multiple elements without adding an extra node (like a <div>) to the DOM.

Key Point
Fragments don’t appear in the DOM.
You can pass keys only with the long form (<React.Fragment key={id}>), useful when mapping lists.

========================== Setting Classes and Text Conditionally ====================

In React JS, you can set classes and text conditionally using JavaScript expressions inside JSX.
Ex. <button className={isActive ? "btn active" : "btn inactive"}>

================== Handling events =================================

You use the onClick attribute on a React element and pass it a function.

Ex. const handleClick = () => {
alert('Button clicked!');
};

<button onClick={handleClick}>

=============================== States ============================================

STATE
👉 Data that a component can hold over time, necessary for information that it needs to remember throughout the app’s lifecycle
👉 “Component’s memory” 🧠
👉 Component state: Single local component variable (“Piece of state”, “state variable”)
👉 Updating component state triggers React to re-render the component

STATE ALLOWS DEVELOPERS TO:
1️⃣ Update the component’s view (by re-rendering it)
2️⃣ Persist local variables between renders

State is a built-in object used to store data that can change within a component. When the state changes, React automatically re-renders the component to update the UI.

-useState is a hook. useSate is used to preserve component's data and update/render the UI.
-useState returns an array at index 0. It contains initail state value . At index 1 contains the setter function to update the state.
Ex. const[step, setStep] = useState();
-Hooks are always start with use keyword like useState, useEffect, useRef etc.

Don't update state manually. Always use the setter function that React provide us.

============================ UPDATING STATE BASED ON THE PREV STATE VALUE =======================

If the new state depends on the old state → use the callback form.

const [count, setCount] = useState(0);

function increment() {
setCount(prevCount => prevCount + 1);
}

function handlePrevious() {
if (step > 1) {
setStep((prevStep) => {
return prevStep - 1;
});
}
}

============================= Guidelines about state ===========================

PRACTICAL GUIDELINES ABOUT STATE

👉 Use a state variable for any data that the component should keep track of (“remember”) over time.
This is data that will change at some point. In Vanilla JS, that’s a let variable, or an [] or {}.

👉 Whenever you want something in the component to be dynamic, create a piece of state related to that “thing”, and update the state when the “thing” should change (aka “be dynamic”).

👉 Example: A modal window can be open or closed. So we create a state variable isOpen that tracks whether the modal is open or not. On isOpen = true we display the window, on isOpen = false we hide it.

👉 If you want to change the way a component looks, or the data it displays, update its state.
This usually happens in an event handler function.

👉 When building a component, imagine its view as a reflection of state changing over time.

👉 For data that should not trigger component re-renders, don’t use state.
Use a regular variable instead. This is a common beginner mistake.

============================== state VS props =====================================
STATE:

- Internal data, owned by component
- Component “memory”, hold a component data
- Can be updated by the component itself
- Updating state causes component to re-render
- Used to make components interactive

PROPS:

- External data, owned by parent component
- Similar to function parameters
- Read-only
- Receiving new props causes component to re-render.
  Usually when the parent’s state has been updated
- Used by parent to configure child component (“settings”)

=================================== controlled element =============================

Controlled element (Simple Definition):
A controlled element is a form input (like <input>, <textarea>, <select>) whose value is managed by React state.
So the UI → always reflects → the current state.

Ex.
import { useState } from "react";
function ControlledInput() {
const [name, setName] = useState("");
const handleChange = (e) => {
setName(e.target.value); // updating state
};
return (

<div>
<input
type="text"
value={name} // input value controlled by state
onChange={handleChange}
/>
<p>Typed Value: {name}</p>
</div>
);
}

export default ControlledInput;

When user types → onChange runs
It updates React state (setName)
React re-renders the component
The input shows the updated value

Definition: Controlled Component (Controlled Element) in React
-A controlled component is an input element whose value is fully controlled by React state.
-The source of truth is the React state.
-The UI updates whenever the state changes.
-You update the state using an onChange handler.
In simple words:
A controlled component is an input element where React state controls the value, not the DOM.

============================== Thinking in React ===============================

THE "THINKING IN REACT" PROCESS:
-Break the desired UI into components and establish the component tree
-Build a static version in React (without state)

// state and props are state managemnt

-Think about state:
.When to use state
.Types of state: local vs. global
.Where to place each piece of state

-Establish data flow:
.One-way data flow
.Child-to-parent communication
.Accessing global state

WHEN YOU KNOW HOW TO "THINK IN REACT", YOU WILL BE ABLE TO ANSWER:
-How to break up a UI design into components?
-How to make some components reusable?
-How to assemble UI from reusable components?
-What pieces of state do I need for interactivity?
-Where to place state? (What component should "own" each piece of state?)
-What types of state can or should I use?
-How to make data flow through app?

=========================== Fundamentals of State management ===============================

LOCAL STATE
-State needed only by one or few components
-State that is defined in a component and only that component and child components have access to it (by passing via props)
-We should always start with local state

GLOBAL STATE
-State that many components might need
-Shared state that is accessible to every component in the entire application
-Tools: Context API | Redux

WHEN TO CREATE STATE:
Need to store data
→ Will data change at some point?
---NO → Regular const variable
---YES → Can be computed from existing state/props? ---> YES → Derive state
|
NO → Should it re-render component?
|
NO → Ref (useRef, more on this later)
YES → Place a new piece of state in component

WHERE TO PLACE STATE:

1. Place a new piece of state in the component

Only used by this component?
YES → Leave in component
NO → Check if it's also used by a child component.

Also used by a child component?
YES → Pass to child via props
NO → Check if it's used by one or a few sibling components.

Used by one or a few sibling components?
YES → Lift state up to the first common parent
NO → Probably global scope.

============================================== Lifting state up ===============

Lifting state up means: Moving the shared state to the closest common parent component when two or more child components need to use or update the same data.

React recommends this so that the single source of truth is maintained in one place.

================================= Derived State ================================

Derived state: state that is computed from an existing piece of state or from props

In React.js, derived state refers to data that is calculated from existing state or props, rather than stored independently.

============================= Children Prop =======================================

In React, the children prop is a special built-in prop that allows you to pass components, elements, or content between the opening and closing tags of a component.

It helps create reusable and flexible components that can wrap different UI content.

children represents whatever is written inside a component tag.

Key Points (Interview Ready)
-children is a reserved prop in React
-Used to pass nested content
-an contain text, JSX, components, or expressions
-Makes components highly reusable
-No need to explicitly pass it as a prop

  <Button clickHandler={handlePrevious}>
              <span>👈</span>Previous
            </Button>
            <Button clickHandler={handleNext}>
              Next <span>👉</span>
            </Button>

<button className="btn" onClick={clickHandler}>
      {children}
    </button>

===============================================================================================================

Component Categories:
👉 Most of your components will naturally fall into one of three categories:

Stateless / Presentational Components
-No state
-Can receive props and simply present received data or other content
-Usually small and reusable

Stateful Components
-Have state
-Can still be reusable

Structural Components
-“Pages”, “layouts”, or “screens” of the app
-Result of composition
-Can be huge and non-reusable (but don’t have to)

===============================================================

Component VS Instance VS Element

1. Component:
   function Tab({ item }) {
   return (

<div className='tab-content'>
<h4>All contacts</h4>
<p>Your post will be visible</p>
</div>
);
}
👉 Description of a piece of UI
👉 A component is a function that returns React elements (element tree), usually written as JSX
👉 “Blueprint” or “Template”

2. Component Instances:
   function App() {
   return (
   <div className='tabs'>
   <Tab item={content[0]} />
   <Tab item={content[1]} />
   <Tab item={content[2]} />
   </div>
   );
   }

Component hierarchy illustration:

App

- Tab
- Tab
- Tab

  👉 Instances are created when we “use” components
  👉 React internally calls Tab()
  👉 Actual “physical” manifestation of a component
  👉 Has its own state and props
  👉 Has a lifecycle (can “be born”, “live”, and “die”)

3. React Element:
   👉 JSX is converted to React.createElement() function calls
   👉 A React element is the result of these function calls
   👉 Information necessary to create DOM elements

To check react Element object console log any component.
Ex. console.log(<DifferentContent />);

4. DOM Element(HTML)
   Actual visual representation of the component instance in the browser

================================================
How to update state based on prev value using setter function:

const[userInfo,setUserInfo] = useState({name: 'abc',age: 21,});

setUserInfo((prevValue)=>{
return {...prevValue,id: 1};
})

-setterFunction receives a callback
-In callback first argument is previous state value
-Value returned from the callback function will be the new state value

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
