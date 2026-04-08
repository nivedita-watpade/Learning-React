import { createContext, useContext } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
  <QuizContext.Provider>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("Unknown");
  return context;
}

export { QuizProvider, useQuiz };
