import { useEffect, useRef } from "react";

const Search = ({ search, setSearch }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    function handleKeyboardEvent(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.key === "Enter") {
        inputEl.current.focus();
        setSearch("");
      }
    }

    window.addEventListener("keydown", handleKeyboardEvent);

    return () => window.removeEventListener("keydown", handleKeyboardEvent);
  }, [setSearch]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
