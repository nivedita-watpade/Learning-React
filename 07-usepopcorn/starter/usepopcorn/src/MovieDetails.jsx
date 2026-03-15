import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useKey } from "./useKey";

const MovieDetails = ({
  selectedId,
  handleCloseMovie,
  onHandleRating,
  onHandleWatch,
  KEY,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);
  useKey("keydown", "Escape", handleCloseMovie);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId,
  )?.userRating;

  // const [avgRating, setAvgRating] = useState(0);
  // console.log(avgRating);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      imdbRating: movie.imdbRating,
      title: movie.Title,
      year: movie.Year,
      runtime: Number(movie.Runtime.split("").at(0)),
      poster: movie.Poster,
      userRating: userRating,
      countRatingDecisions: countRef.current,
    };

    onHandleWatch(newWatchedMovie);
    handleCloseMovie();
  }

  function handleUserRating(rating) {
    countRef.current++;
    setUserRating(rating);
  }

  useEffect(
    function () {
      async function selectedMovie() {
        if (!selectedId) return;
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      selectedMovie();
    },
    [selectedId],
  );

  useEffect(() => {
    if (!movie.Title) return;
    document.title = `Movie | ${movie.Title}`;
    return function () {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt="movie poster" />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐{movie.imdbRating} IMDb Rating</span>
              </p>
            </div>
          </header>
          <section>
            {!isWatched ? (
              <>
                <StarRating
                  onHandleRating={onHandleRating}
                  maxRating={10}
                  size={36}
                  onUserRating={handleUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to List
                  </button>
                )}
              </>
            ) : (
              <p className="rating" style={{ textAlign: "center" }}>
                You rated with Movie {watchedUserRating} ⭐
              </p>
            )}

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
