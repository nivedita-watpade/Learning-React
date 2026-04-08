import { useQuiz } from "./context/QuizContext";
import { renderEmoji } from "./util/RenderEmoji";

function FinishScreen() {
  const { totalPoints, points, highScore, dispatch } = useQuiz();
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {renderEmoji(percentage)} {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
