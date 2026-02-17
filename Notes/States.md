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

================================================================================
How to update state based on prev value using setter function:

const[userInfo,setUserInfo] = useState({name: 'abc',age: 21,});

setUserInfo((prevValue)=>{
return {...prevValue,id: 1};
})

-setterFunction receives a callback
-In callback first argument is previous state value
-Value returned from the callback function will be the new state value
