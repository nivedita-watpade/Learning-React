import { useRef } from "react";
import { useKey } from "./useKey";

const Search = ({ search, setSearch }) => {
  const inputEl = useRef(null);

  useKey("keydown", "Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setSearch("");
  });

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
