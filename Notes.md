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
