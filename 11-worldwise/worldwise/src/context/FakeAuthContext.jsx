import { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Nivi",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const inititalSate = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  const { type, payload } = action;
  if (type === "login")
    return { ...state, user: payload, isAuthenticated: true };

  if (type === "logout")
    return { ...state, user: null, isAuthenticated: false };
}

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, inititalSate);
  const { user, isAuthenticated } = state;

  const handleLogin = function (email, password) {
    if (!email || !password) return;
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  function handleLogout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Authcontext was used outside the AuthProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
