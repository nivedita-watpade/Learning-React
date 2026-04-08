React Context API – Notes

1. What is Context API?
   Context API is a system in React used to share data across the component tree without manually passing props at every level (avoids prop drilling).

👉 It allows us to broadcast global state to multiple components in the application.

Example of global data:
-Theme
-User authentication
-Language settings
-App configuration

2. Main Parts of Context API
   1️⃣ Provider
   Provider supplies the data to components.
   It wraps the components that need access to the context.

   Example concept:
   <Provider value={data}>
   <App />
   </Provider>

✔ All child components inside the Provider can access the value.

    2️⃣ Value
    Value is the data we want to share globally.
    Usually contains:
    -state
    -functions
    -objects

    Example:
    value={{
    user,
    login(),
    logout()
    }}

    3️⃣ Consumers
    Consumers are components that read the context value.
    They can access the data using:
    -useContext() hook (modern way)
    -Context.Consumer (older way)

    Example concept:
    const data = useContext(MyContext);

==================================================================

1.  Create a Context
    const PostContext = createContext();

    Explanation
    -createContext() is used to create a Context object.
    -This context will hold global data that can be accessed by many components.
    -It helps avoid prop drilling (passing props through many levels of components).

2.  Provide Context Value

    <PostContext.Provider
    value={{
        posts: searchedPosts,
        searchQuery,
        onClearPosts: handleClearPosts,
        onAddPost: handleAddPost,
        setSearchQuery,
      }}

    > {children}
    > </PostContext.Provider>

    Explanation
    -Provider is used to share data with child components.
    -The value prop contains all the data and functions that should be accessible globally.

3.  Consume Context Value
    const { searchQuery, setSearchQuery } = useContext(PostContext);

    Explanation
    -The context is consumed using a custom hook (usePosts).
    -This hook internally uses useContext(PostContext).

---

Notes:
If we pass dispatch function to the component from context we have to write our data fetching logic into that component.i.e If we are dealing with asynchronus operation then there is no need to pass dispatch function to the component.

-If we are not delaing with asynchronus code it would be better to just pass the dispatch function and create the actions inside the component.

---
