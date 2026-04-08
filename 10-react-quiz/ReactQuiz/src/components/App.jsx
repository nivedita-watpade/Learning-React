import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "../FinishScreen";
import Timer from "./Timer";
import { QuizProvider, useQuiz } from "../context/QuizContext";

function App() {
  const { status } = useQuiz();

  console.log(status);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Timer />
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
