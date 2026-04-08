import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { answer, dispatch, totalQuestion, index } = useQuiz();

  const hasAnswered = answer !== null;
  const isLastIndex = index === totalQuestion - 1;
  const isAnsLastIndex = hasAnswered && isLastIndex;

  return (
    <>
      <div className="options">
        {question.options.map((option, i) => {
          return (
            <button
              className={`btn btn-option ${i === answer ? "answer" : ""} ${hasAnswered ? (question.correctOption === i ? "correct" : "wrong") : ""}`}
              key={i}
              disabled={hasAnswered}
              onClick={() => dispatch({ type: "ansReceived", payload: i })}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div>
        {hasAnswered && !isLastIndex && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "next" })}
          >
            Next
          </button>
        )}

        {isAnsLastIndex && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished" })}
          >
            Finish
          </button>
        )}
      </div>
    </>
  );
}

export default Options;
