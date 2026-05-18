useLoaderData is a React Router hook used to access data loaded by a route loader function.

What is useLoaderData?
-useLoaderData() allows you to fetch data before a page/component renders.
-Instead of using useEffect + fetch, React Router loads the data first and then renders the component.

Syntax:
const data = useLoaderData();

- Add Loader to Route:

const router = createBrowserRouter([
{
path: "/",
element: <App />,
loader: userLoader,
},
]);

- Use useLoaderData
const user = useLoaderData();
<h1>{user.name}</h1>

How It Works:
1.User visits route /
2.React Router runs the loader
3.Data is fetched
4.Component renders
5.useLoaderData() gives access to fetched data

Why Use useLoaderData?
Advantages:
-No need for useEffect
-Data loads before rendering
-Better user experience
-Cleaner code
-Built-in route-based fetching

Important Notes:
Works only with React Router Data APIs
Available in React Router v6.4+
Must define loader in route

Difference between useEffect and useLoaderData
-useEffect
Fetches after render
Manual state handling
Can cause loading flicker
Component-based fetching

-useLoaderData
Fetches before render
Automatic
Better UX
Route-based fetching

============================================

useNavigation is a hook from React Router official docs used to track the current navigation state in your React application.

It is mainly used for:
Showing loading spinners
Disabling buttons during navigation
Displaying pending UI while routes/data load

const navigation = useNavigation();
{navigation.state === "loading" && <p>Loading...</p>}

Navigation States

navigation.state can have 3 values:

State Meaning:
"idle" --- No navigation happening
"loading" --- Route/data is loading
"submitting" --- Form is submitting

=====================================================================

useRouteError() is a hook from React Router official docs used to access errors thrown inside:
loader
action
Route components

It is mainly used inside an ErrorBoundary component.

Router Setup
const router = createBrowserRouter([
{
path: "/",
element: <Home />,
errorElement: <ErrorPage />,
},
]);

const error = useRouteError();

 <p>{error.message}</p>

Common Use Cases
Loader errors : API/data fetch failures
Action errors : Form submission failures
Route crashes : Component runtime errors
404 pages : Invalid routes

useRouteError() only works inside an errorElement.
