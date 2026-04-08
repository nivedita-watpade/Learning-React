/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const CityContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  const { type, payload } = action;

  if (type === "loading") {
    return { ...state, isLoading: true };
  }

  if (type === "cities/loaded") {
    return { ...state, cities: payload, isLoading: false };
  }

  if (type === "cities/created") {
    return {
      ...state,
      cities: [...state.cities, payload],
      isLoading: false,
      currentCity: payload,
    };
  }

  if (type === "cities/deleted") {
    const newCities = state.cities.filter((city) => city.id !== payload);
    return { ...state, cities: newCities, isLoading: false, currentCity: {} };
  }

  if (type === "city/loaded") {
    return { ...state, currentCity: payload, isLoading: false };
  }

  if (type === "rejected") {
    return { ...state, error: payload, isLoading: false };
  }
}

function CityProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading", payload: true });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "rejected",
          payload: "There was an error while fetching cities...",
        });
      }
      // finally {
      //   dispatch({ type: "loading", payload: false });
      // }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading", payload: true });
      try {
        const res = await fetch(`http://localhost:9000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({
          type: "rejected",
          payload: "There was an error loading city...",
        });
      }
    },
    [currentCity.id],
  );

  async function createCity(newCity) {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`http://localhost:9000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: "cities/created", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "There was an error while creating city...",
      });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading", payload: true });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "There was an error while deleting city...",
      });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCities() {
  if (!CityContext) throw new Error("Context not found");
  return useContext(CityContext);
}

export { CityProvider, useCities };
