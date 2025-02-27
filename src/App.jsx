import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./Context/ThemeContext/ThemeProvider";
import { lazy, Suspense } from "react";
import MovieProvider from "./Context/MovieContext/MovieProvider";

function App() {
  const LazyMovies = lazy(() => import("./Pages/Movies"));

  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <Navbar />
        </ThemeProvider>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Movies"
              element={
                <Suspense>
                  <LazyMovies />
                </Suspense>
              }
            />
          </Routes>
        </MovieProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
