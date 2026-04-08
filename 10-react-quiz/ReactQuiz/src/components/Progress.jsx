import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { totalQuestion, index, totalPoints, points, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={totalQuestion} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {totalQuestion}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
}

export default Progress;
