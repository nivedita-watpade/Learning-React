import { useEffect, useState } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, totalQuestion } = useQuiz();

  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const SECS_PER_QUESTION = 30;

  useEffect(
    function () {
      let time = totalQuestion * SECS_PER_QUESTION;

      const startTimer = () => {
        setMin(String(Math.trunc(time / 60)).padStart(2, 0));
        setSec(String(Math.trunc(time % 60)).padStart(2, 0));

        if (time === 0) {
          dispatch({ type: "finished" });
        }

        time = time - 1;
      };

      startTimer();
      const logoutInterval = setInterval(startTimer, 1000);

      return () => {
        clearInterval(logoutInterval);
      };
    },
    [dispatch],
  );

  return (
    <div className="timer">
      Time: {min}:{sec}{" "}
    </div>
  );
}

export default Timer;
