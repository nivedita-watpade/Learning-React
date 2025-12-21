import { useState } from "react";
import Button from "./Button";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  // const step = 2;
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep((prevStep) => {
        return prevStep - 1;
      });
    }
  }
  function handleNext() {
    if (step < 3) {
      // setStep(step + 1);
      setStep((nextStep) => {
        return nextStep + 1;
      });
    }
  }
  function displayStepper() {
    setOpen((open) => !open);
  }
  return (
    <>
      <button className="close" onClick={displayStepper}>
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 && "active"}>1</div>
            <div className={step >= 2 && "active"}>2</div>
            <div className={step >= 3 && "active"}>3</div>
          </div>
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button clickHandler={handlePrevious}>
              <span>👈</span>Previous
            </Button>
            <Button clickHandler={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );

  function StepMessage({ step, children }) {
    return (
      <p className="message">
        Step {step}:{children}
      </p>
    );
  }
}

export default App;
