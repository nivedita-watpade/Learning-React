📌 What is Routing?
🔹 Routing
Routing is the process of matching different URLs to different UI views (React components).
These mappings are called routes.

🔹 Why Routing is Important
👉 Matches different URLs to different components
👉 Allows users to navigate between different screens using the browser URL
👉 Keeps the UI in sync with the browser URL
👉 Helps in building Single-Page Applications (SPAs)

🔹 In React
Routing is handled using the React Router package
It enables client-side routing

📌 Single-Page Applications (SPA)
🔹 What is an SPA?
A Single-Page Application is an application that:
👉 Is executed entirely on the client (browser)
👉 Uses JavaScript (React) to update the page (DOM)
👉 Does NOT reload the page
👉 Feels like a native app
👉 May load additional data from a Web API

📌 How SPA Routing Works (Client-Side)
Step-by-step Flow:
👆 User clicks a router link
🔄 The URL changes
🧠 React Router detects the URL change
🎨 The corresponding React component is rendered
🔁 The DOM is updated
🌐 If needed, data is fetched from the server (Web API)

✅ The page is never fully reloaded
✅ Everything runs on the client side (browser)

===========================================================================

📌 React Router – Link vs NavLink
Both Link and NavLink are components from react-router-dom used for client-side navigation in a Single Page Application (SPA).
They prevent full page reload and update the URL using React Router.

🔹 1️⃣ Link
✅ What is Link?
Link is used to navigate between routes without reloading the page.
It replaces the traditional <a> tag in React applications.

🔹 2️⃣ NavLink
✅ What is NavLink?
NavLink is a special version of Link that knows whether it is active or not.
It is mostly used for navigation menus.

-Link and NavLink are part of client-side routing
-They prevent full page refresh
-NavLink is used when you need active styling
-Used inside <BrowserRouter>
-Work with <Routes> and <Route>

=======================================================================

📘 CSS Modules – Notes (React)
1️⃣ What is CSS Module?

CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

It helps avoid:
-Global namespace conflicts
-Class name collisions
-Overriding issues in large projects

Ex.
Step 2: Import It in Component
import styles from "./Button.module.css";

function Button() {
return <button className={styles.button}>Click Me</button>;
}

========================================= Nested Route ====================================================

In React Router, a Nested Route means a route inside another route.
It allows you to render a component inside a parent component’s layout.

This is very common in dashboard layouts, profile pages, settings pages, etc..

Ex.
<Routes>
<Route path="/dashboard" element={<Dashboard />}>
<Route path="profile" element={<Profile />} />
<Route path="settings" element={<Settings />} />
</Route>
</Routes>

-Child routes do NOT start with /

- Parent Component Must Use Outlet
  In the parent component, we use Outlet from React Router to show the child component.
  Ex.
    <div>
    <h1>Dashboard</h1>

          <nav>
            <Link to="profile">Profile</Link>
            <Link to="settings">Settings</Link>
          </nav>

          <Outlet />
        </div>

Nested routing allows child routes to be rendered inside a parent route layout using Outlet. It helps structure complex UIs where multiple pages share the same layout.

-Index Routes
An Index Route is the default nested route that renders inside a parent route when no other child route matches. It is defined using the index prop instead of a path.

1️⃣ Index routes don't use path
❌ Wrong
<Route path="" element={<Home />} />

✅ Correct
<Route index element={<Home />} />

============================== URL for State Management (in React)=======================================

In web applications (especially when using React Router), the URL can be used to store UI state. This can sometimes be an alternative to using React state like useState.

1. Why Use URL for State Management?

The URL is a good place to store UI state because:
-It is global and accessible across components.
-It allows navigation between pages while keeping state.
-It makes the page shareable and bookmarkable.

Example UI states stored in URL
-Open / closed panels
-Selected list item
-Sorting order of a list
-Applied filters in a list

Structure of a URL
Example:
www.example.com/app/cities/lisbon?lat=38.728&lng=-9.141

1️⃣ Path
/app/cities
Defines the route structure.

2️⃣ Params (Route Parameters)
/lisbon

Dynamic values in the route.
Used to identify resources.
Example React route:
<Route path="/app/cities/:cityName" />

3️⃣ Query String (Search Params)
?lat=38.728&lng=-9.141

Used to store:
Filters
Sorting
Coordinates
Pagination

Example:
?page=2&sort=price

==================================== useParams() =======================================

useParams() in React:
useParams() is a hook provided by React Router that allows you to access dynamic parameters from the URL.
It is commonly used when a route contains dynamic values like an ID, name, or slug.

1️⃣ Why useParams() is Used

To read dynamic values from the URL
Helps load specific data based on the route
Often used in detail pages

Example:
/products/10
/users/25
/cities/lisbon

Here 10, 25, and lisbon are dynamic parameters.

2️⃣ Route with Params
Example route:
<Route path="/products/:id" element={<Product />} />

Here:
:id → dynamic parameter
URL example:
/products/10

3️⃣ Using useParams()
import { useParams } from "react-router-dom";

function Product() {
const params = useParams();

return <h1>Product ID: {params.id}</h1>;
}

Output for /products/10:

4️⃣ Destructuring Params (Best Practice)
Instead of using params.id, you can destructure it.
import { useParams } from "react-router-dom";
function Product() {
const { id } = useParams();
return <h1>Product ID: {id}</h1>;
}

5️⃣ Multiple Params Example
Route:
<Route path="/users/:userId/posts/:postId" element={<Post />} />

6️⃣ Important Points
useParams() returns an object
Keys come from route parameter names
Values are always strings
Only works inside components rendered by a Route

============================== useSearchParams() =============================

useSearchParams() in React
useSearchParams() is a hook from React Router used to read and update query parameters (search params) in the URL.
Query parameters appear after ? in the URL.

Example:
/products?category=electronics&page=2

Here:
category=electronics
page=2

These are search parameters.

1️⃣ Syntax
const [searchParams, setSearchParams] = useSearchParams();

searchParams → read query parameters
setSearchParams → update query parameters

2️⃣ Reading Query Parameters

Example URL:
/products?category=electronics&page=2

const [searchParams] = useSearchParams();

const category = searchParams.get("category");
const page = searchParams.get("page");

Output:
Category: electronics
Page: 2

4️⃣ Updating a Single Param
const page = searchParams.get("page");

setSearchParams({
category: searchParams.get("category"),
page: Number(page) + 1
});

6️⃣ Important Points (Interview)
useSearchParams() manages URL query parameters
-Returns array with two values
-searchParams
-setSearchParams
-searchParams behaves like URLSearchParams
-Values are always strings

=============================================================

useNavigate() in React
useNavigate() is a hook from React Router used to navigate programmatically between pages in a React application.
It allows navigation using JavaScript instead of clicking a <Link>.

1️⃣ Syntax
const navigate = useNavigate();

Then use it like:
navigate("/home");

import { useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();

function handleClick() {
navigate("/about");
}

return <button onClick={handleClick}>Go to About</button>;
}

When the button is clicked → it navigates to /about.

3️⃣ Navigate with Parameters
Example route:
<Route path="/product/:id" element={<Product />} />

Navigate to product page:
navigate("/product/10");
URL becomes:
/product/10

4️⃣ Navigate Back or Forward
useNavigate() can move in browser history.
navigate(-1); // Go back
navigate(1); // Go forward

Example:
<button onClick={() => navigate(-1)}>Back</button>

- Real Use Cases
  useNavigate() is used for:
  Redirect after login
  Redirect after form submission
  Back button functionality
  Conditional navigation

=================================================================

Difference Between useNavigate, Link, and NavLink

User Navigation:
|
|---- Link ---------> Normal navigation
|
|---- NavLink ------> Navigation + Active style
|
|---- useNavigate --> Navigation using JS logic

======================================================================

<Navigate> in React

<Navigate> is a component from React Router used to redirect users to another route during rendering.

It is mainly used for conditional redirects.

1️⃣ Basic Syntax
import { Navigate } from "react-router-dom";

<Navigate to="/home" />

This will immediately redirect the user to /home.
Ex.
<Navigate to="/login" replace />

This prevents the user from going back to the previous page.
