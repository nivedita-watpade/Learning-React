const Button = ({ text, onClickHandler }) => {
  return (
    <button className="button" onClick={onClickHandler}>
      {text}
    </button>
  );
};

export default Button;
