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
