import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, searchQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`order/${query}`);
    searchQuery("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search order #"
          value={query}
          onChange={(e) => searchQuery(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchOrder;
