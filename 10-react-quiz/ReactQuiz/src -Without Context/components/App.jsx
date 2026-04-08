import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "../FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],

  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  const { type, payload } = action;

  if (type === "dataReceived")
    return { ...state, questions: payload, status: "ready" };

  if (type === "dataActive") return { ...state, status: "active" };

  if (type === "dataFailed")
    return { ...state, questions: [], status: "error" };

  if (type === "next") {
    // if (state.index === state.questions.length)
    return { ...state, index: state.index++, answer: null };
  }

  if (type === "finished") {
    return {
      ...state,
      status: "finished",
      highScore:
        state.highScore > state.points ? state.highScore : state.points,
    };
  }

  if (type === "ansReceived") {
    const question = state.questions.at(state.index);
    return {
      ...state,
      answer: payload,
      points:
        action.payload === question.correctOption
          ? state.points + question.points
          : state.points,
    };
  }

  if (type === "reset") {
    return { ...initialState, questions: state.questions, status: "ready" };
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] =
    useReducer(reducer, initialState);

  const totalQuestion = questions.length;
  const totalPoints = questions.reduce(
    (acc, currQues) => acc + currQues.points,
    0,
  );

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        console.log(err);
        dispatch({ type: "dataFailed" });
      }
    }

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen totalQuestion={totalQuestion} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              totalQuestion={totalQuestion}
              index={index}
              totalPoints={totalPoints}
              points={points}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
              index={index}
              totalQuestion={totalQuestion}
            />
            <Timer dispatch={dispatch} totalQuestion={totalQuestion} />
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            totalPoints={totalPoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
