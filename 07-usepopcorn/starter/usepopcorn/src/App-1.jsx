import { useState } from "react";
import Navbar from "./Navbar";
import MoviesList from "./MoviesList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import Search from "./Search";
import MainApp from "./MainApp";
import Box from "./Box";
import StarRating from "./StarRating";
import Test from "./Test";

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

function handleRatings(rating) {
  if (rating <= 3) return "Poor";
  if (rating <= 5) return "Average";
  if (rating <= 7) return "Good";
  if (rating > 7) return "Very Good";
}

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <StarRating
        maxRating={10}
        color={"#000"}
        strokeWidth={"5"}
        strokeColor={"#000"}
        ratingTxt={0}
        size={35}
        ratingsLabel={ratingsLabel}
        onHandleRating={handleRatings}
      />
      <StarRating
        maxRating={5}
        color={"#ab0909ff"}
        strokeWidth={"3"}
        strokeColor={"#fcc419"}
        ratingTxt={2}
        onHandleRating={handleRatings}
      />

      <Test onHandleRating={handleRatings} />

      {/* <Navbar movies={movies}>
        <Search />
      </Navbar>

      <MainApp>
        <Box>
          <MoviesList movies={movies} />
        </Box>

        <Box>
          <WatchedMoviesSummary watched={watched} average={average} />
          <WatchedMoviesList watched={watched} />
        </Box>
      </MainApp> */}
    </>
  );
}
