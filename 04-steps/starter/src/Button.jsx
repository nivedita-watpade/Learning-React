import React from "react";

const Button = ({ clickHandler, children }) => {
  return (
    <button className="btn" onClick={clickHandler}>
      {children}
    </button>
  );
};

export default Button;
