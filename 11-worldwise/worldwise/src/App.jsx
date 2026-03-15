import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";

import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoding, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.log(err);
        alert("There was an error while fetching data...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <div>
      {/* <PageNav /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/pricing" element={<Pricing />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />}></Route>
            <Route
              path="cities"
              element={<CityList cities={cities} isLoding={isLoding} />}
            ></Route>
            <Route path="cities/:id" element={<City />}></Route>
            <Route
              path="countries"
              element={<CountryList cities={cities} isLoding={isLoding} />}
            ></Route>
            <Route path="form" element={<Form />}></Route>
          </Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
