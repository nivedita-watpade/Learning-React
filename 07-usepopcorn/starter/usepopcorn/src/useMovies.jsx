import { useState, useEffect } from "react";

const KEY = "43ada969";

export function useMovies(search, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          if (!search) return;
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
            { signal: controller.signal },
          );

          if (!res.ok)
            throw new Error("Something went wrong with movie fetching");
          const data = await res.json();

          if (data.Response === "False") throw new Error("No movie found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      callback?.();
      fetchMovies();

      return () => controller.abort();
    },
    [search],
  );
  return { movies, isLoading, error };
}
