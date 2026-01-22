import { useState } from "react";
import Star from "./Star";

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  strokeColor = "#fcc419",
  strokeWidth,
  ratingTxt,
  size,
  onHandleRating,
  setMoviesRating,
}) => {
  const [rating, setRating] = useState(ratingTxt);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  const txtStyle = {
    fontSize: `${size / 2}px`,
    color,
  };

  const ratingLabels = onHandleRating(rating ? rating : tempRating);

  return (
    <div className="rating">
      <div className="star-wrap">
        <div className="star-main">
          {Array.from({ length: maxRating }, (_, i) => (
            <Star
              key={i}
              handleOnClick={() => {
                handleRating(i + 1);
                setMoviesRating?.(i + 1);
              }}
              full={tempRating >= i + 1 || rating >= i + 1}
              onHoverIn={() => {
                setTempRating(i + 1);
                setMoviesRating?.(i + 1);
              }}
              onHoverOut={() => {
                setTempRating(0);
                setMoviesRating?.(0);
              }}
              color={color}
              strokeWidth={strokeWidth}
              strokeColor={strokeColor}
              // onHandleRating={onHandleRating}
            />
          ))}
        </div>
        <p style={txtStyle}>{tempRating || rating || ""}</p>
        <p>{ratingLabels}</p>
      </div>
    </div>
  );
};

export default StarRating;
