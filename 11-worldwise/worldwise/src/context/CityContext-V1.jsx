/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";

const CityContext = createContext();

const BASE_URL = "http://localhost:9000";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  const { type, payload } = action;
  if (type === "cities") {
    return { ...state, cities: payload };
  }
  if (type === "createCity") {
    return { ...state, cities: [...state.cities, payload] };
  }
  if (type === "deleteCity") {
    const newCities = state.cities.filter((city) => city.id !== payload);
    return { ...state, cities: newCities };
  }

  if (type === "loading") {
    return { ...state, isLoading: payload };
  }

  if (type === "getCity") {
    return { ...state, currentCity: payload };
  }
}

function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, isLoading, currentCity } = state;

  useEffect(() => {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading", payload: true });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities", payload: data });
        // setCities(data);
      } catch (err) {
        console.log(err);
        alert("There was an error while fetching data...");
      } finally {
        // setIsLoading(false);
        dispatch({ type: "loading", payload: false });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await fetch(`http://localhost:9000/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "getCity", payload: data });
      // setCurrentCity(data);
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

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
      dispatch({ type: "createCity", payload: data });
      // setCities((prev) => {
      //   return [...prev, data];
      // });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading", payload: true });

      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
      // setCities((prev) => {
      //   return prev.filter((city) => city.id !== id);
      // });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
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
