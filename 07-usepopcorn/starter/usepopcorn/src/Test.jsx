import React, { useState } from "react";
import StarRating from "./StarRating";

const Test = ({ onHandleRating }) => {
  const [moviesRating, setMoviesRating] = useState(0);
  return (
    <div>
      <StarRating
        color="red"
        maxRating={10}
        strokeColor={"#356bffff"}
        setMoviesRating={setMoviesRating}
        onHandleRating={onHandleRating}
      />
      <p>This movie was rated {moviesRating} stars</p>
    </div>
  );
};

export default Test;
