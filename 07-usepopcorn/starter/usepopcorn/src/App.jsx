import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Search from "./Search";
import MainApp from "./MainApp";
import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";

function handleRatings(rating) {
  if (rating <= 3) return "Poor";
  if (rating <= 5) return "Average";
  if (rating <= 7) return "Good";
  if (rating > 7) return "Very Good";
}

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "43ada969";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("Inception");
  const [selectedId, setSelectedId] = useState(null);

  // useEffect(function () {
  //   fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  // const handleClick = function () {
  //   console.log("hello");
  // };
  //SearchById- http://www.omdbapi.com/?i=tt1375666 or
  //https://www.omdbapi.com/?apikey=${KEY}&i=tt32821057

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          // const movieName = search;
          if (!search) return;
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
          );

          if (!res.ok)
            throw new Error("Something went wrong with movie fetching");
          const data = await res.json();

          if (data.Response === "False") throw new Error("No movie found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
      // return function () {
      //   window.removeEventListener("click", handleClick);
      // };
    },
    [search],
  );

  return (
    <>
      <Navbar movies={movies}>
        <Search search={search} setSearch={setSearch} />
      </Navbar>

      <MainApp>
        <Box>
          {isLoading && <p className="loader">Loading...</p>}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              KEY={KEY}
              onHandleRating={handleRatings}
              onHandleWatch={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} average={average} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </MainApp>
    </>
  );
}
