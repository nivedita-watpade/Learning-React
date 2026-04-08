import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

  if (type === "dataActive") {
    return { ...state, status: "active" };
  }

  if (type === "dataFailed")
    return { ...state, questions: [], status: "error" };

  if (type === "next") {
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

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        totalQuestion,
        totalPoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Unknown");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { QuizProvider, useQuiz };
