import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Search from "./Search";
import MainApp from "./MainApp";
import Box from "./Box";
import StarRating from "./StarRating";
import Test from "./Test";
import ErrorMessage from "./ErrorMessage";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "43ada969";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("Inception");
  // console.log(search);

  // useEffect(function () {
  //   fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search));
  // }, []);

  // const handleClick = function () {
  //   console.log("hello");
  // };

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
          {!isLoading && !error && <MoviesList movies={movies} />}
        </Box>

        <Box>
          <WatchedMoviesSummary watched={watched} average={average} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </MainApp>
    </>
  );
}
