🔹 What is a Class Component?
A Class Component is a JavaScript class that:
-Extends React.Component
-Has a render() method
-Can manage state
-Uses lifecycle methods

🔹 Basic Syntax
import React, { Component } from "react";

class Welcome extends Component {
constructor(props) {
super(props);
this.state = {
name: "Nivedita"
};
}

render() {
return <h1>Hello {this.state.name}</h1>;
}
}

export default Welcome;
🔹 Key Features
1️⃣ State Management
State is defined inside the constructor:
this.state = {
count: 0
};

Update state using:
this.setState({ count: this.state.count + 1 });

⚠ Never update state directly:
this.state.count = 1 ❌
2️⃣ Lifecycle Methods

Class components use lifecycle methods like:
Phase Method
Mounting - componentDidMount()
Updating - componentDidUpdate()
Unmounting - componentWillUnmount()

🔹 Lifecycle Phases in Class Components

There are 3 main phases:

1️⃣ Mounting Phase (When component is created & inserted into DOM) - like useEffect with []
2️⃣ Updating Phase (When state or props change) -- like useEffect with [value]
3️⃣ Unmounting Phase (When component is removed from DOM) --- cleanup function

1. ✔ componentDidMount()
   Called after component is added to DOM

2. ✔ componentDidUpdate(prevProps, prevState)
   Runs after update

3. ✔ componentWillUnmount()
   Called before component is removed
