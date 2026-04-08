import { lazy } from "react";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CityProvider } from "./context/CityContext";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectRoute from "./pages/ProtectRoute";

import CityList from "./components/CityList";
import City from "./components/City";
import Form from "./components/Form";
import CountryList from "./components/CountryList";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import HomePage from "./pages/HomePage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Login from "./pages/Login";
// import NotFoundPage from "./pages/NotFoundPage";
// import AppLayout from "./pages/AppLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  // const [cities, setCities] = useState([]);

  return (
    <div>
      {/* <PageNav /> */}
      <AuthProvider>
        <CityProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route
                  path="/product"
                  element={
                    <Suspense fallback={<SpinnerFullPage />}>
                      <Product />
                    </Suspense>
                  }
                ></Route>
                <Route path="/pricing" element={<Pricing />}></Route>
                <Route path="/login" element={<Login />}></Route>

                <Route
                  path="/app"
                  element={
                    <ProtectRoute>
                      <AppLayout />
                    </ProtectRoute>
                  }
                >
                  <Route
                    index
                    element={<Navigate to="cities" replace />}
                  ></Route>

                  <Route path="cities" element={<CityList />}></Route>

                  <Route path="cities/:id" element={<City />}></Route>
                  <Route path="countries" element={<CountryList />}></Route>
                  <Route path="form" element={<Form />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CityProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
