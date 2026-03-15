✅ Function Components:
-Introduced with React v16.8 (2019, with Hooks)
-Created using a JavaScript function
Read props using:
-Destructuring → ({ name })
-Or props.name

Manage local state using:
-useState hook

Handle side effects using:
-useEffect hook

-Event handlers are normal functions
-Return JSX directly from the function

✅ Advantages:
Less boilerplate code
Cleaner and simpler syntax
Easier to share stateful logic (via custom hooks)
No need for this keyword
useEffect combines lifecycle logic in one place

=================================================================================

✅ Class Components
-Introduced in React v0.13 (2015)
-Created using ES6 class extending React.Component
-Read props using:
this.props.name

-Manage local state using:
this.setState()

Handle side effects using:
-Lifecycle methods (componentDidMount, componentDidUpdate, etc.)
-Event handlers are class methods

-Return JSX from:
render() method

✅ Advantages:

Lifecycle methods may be easier to understand for beginners