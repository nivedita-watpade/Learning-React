import Options from "./Options";

function Question({ question, dispatch, answer, totalQuestion, index }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        answer={answer}
        totalQuestion={totalQuestion}
        index={index}
      />
    </div>
  );
}

export default Question;
