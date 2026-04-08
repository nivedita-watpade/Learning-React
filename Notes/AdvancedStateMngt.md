===========================================================================

1. Types of State
   State in React can be classified in two ways:

1️⃣ Based on Accessibility

🏠 Local State
-State used only by one or few components
-Accessible only inside the component and its child components
-Managed inside the component

Example tools
-useState
-useReducer
-useRef

Example

function Counter() {
const [count, setCount] = useState(0);
}

👉 Use when state does not need to be shared across many components

🌍 Global State
-State shared across many components
-Accessible anywhere in the application
-Used for data required by multiple parts of the app

Example tools
-Context API
-Redux
-Zustand
-Recoil

Example
-User authentication
-Theme (dark/light mode)
-Shopping cart

===================================================================================

2. State Domain
   🌐 Remote State
   State that comes from an external server (API).

Characteristics:
-Loaded from backend
-Usually asynchronous
-Needs fetching and refetching

Examples:
-Users list
-Products data
-Blog posts

Tools commonly used:
-Fetch + useEffect
-React Query
-SWR
-RTK Query

🎨 UI State
State that controls UI behavior.

Examples:
-Theme
-Form inputs
-Modal open/close
-Filters
-Toggle states

Characteristics:
-Usually synchronous
-Stored inside the application

===================================================================================

3. State Placement Options

Where should state live?

| Location              | Tools                                 | When to Use                                                  |
| --------------------- | ------------------------------------- | ------------------------------------------------------------ |
| **Local Component**   | `useState`, `useReducer`, `useRef`    | For local state                                              |
| **Parent Component**  | `useState`, `useReducer`              | When sharing between child components (**lifting state up**) |
| **Context**           | Context API + `useState`/`useReducer` | Global UI state                                              |
| **3rd Party Library** | Redux, React Query, SWR, Zustand      | Large apps / complex state                                   |
| **URL**               | React Router                          | Passing state between pages                                  |
| **Browser Storage**   | localStorage, sessionStorage          | Persist data in browser                                      |

===========================================================================================

State Management Tool Options

Refer to StateManagementToolOption image
