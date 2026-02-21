import { useState } from "react";
import Navbar from "./Navbar";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Search from "./Search";
import MainApp from "./MainApp";
import Box from "./Box";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

function handleRatings(rating) {
  if (rating <= 3) return "Poor";
  if (rating <= 5) return "Average";
  if (rating <= 7) return "Good";
  if (rating > 7) return "Very Good";
}

const average = (arr = []) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "43ada969";

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(search, handleCloseMovie);
  const [watched, setWatched] = useLocalStorage([], "watchedMovie");

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
