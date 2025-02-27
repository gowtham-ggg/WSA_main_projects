import React, { useCallback, useEffect, useMemo, useState, useContext } from "react";
import clsx from "clsx";
import assets from "../assets/assets";
import Card from "./ui/Card";
import Button from "./ui/Button";
import ProgressBar from "./ui/ProgressBar";
import QuizLogo from "./ui/QuizLogo";
import QuestionContext from "../store/QuestionContext";
import validateAnswerApi from "../api/ValidateAnswerApi";
import handleError from "../utils/handleError";

function NextArrowIcon() {
  return <img src={assets.chevronLeftRounded} alt="arrow" />;
}

const QuestionScreen = (props) => {
  const { showResultScreen } = props;
  const [loading, setLoading] = useState(false);
  const [userSelectedOption, setUserSelectedOption] = useState("");
  const [isAnsweredCorrect, setIsAnsweredCorrect] = useState(false); 

  const {
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    updateQuestions,
    activeNextQuestion,
  } = useContext(QuestionContext); 

  const hasAttempted = Boolean(userSelectedOption);

  useEffect(() => {
    setUserSelectedOption("");
    setIsAnsweredCorrect(false); 
  }, [activeQuestion._id]);

  const isFinalQuestion = useMemo(
    () => activeQuestionNumber === totalQuestions,
    [activeQuestionNumber, totalQuestions]
  );

  const handleResponse = useCallback(
    function (responseData) {
      const isCorrect = responseData.status === 1;
      setIsAnsweredCorrect(isCorrect); 
      updateQuestions(isCorrect);
    },
    [updateQuestions]
  );

  const handleClick = useCallback(
    (selectedOption) => {
      setUserSelectedOption(selectedOption.id);
      validateAnswerApi(
        activeQuestion._id,
        selectedOption,
        handleResponse,
        handleError,
        setLoading
      );
    },
    [activeQuestion._id, handleResponse]
  );

  return (
    <section className="question-section">
      <QuizLogo />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">
            {activeQuestionNumber} / {totalQuestions}
          </div>
          <p className="question-text">{activeQuestion.question}</p>
          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption;
              const isOptionCorrect = isThisSelected && isAnsweredCorrect;
              const isOptionIncorrect = isThisSelected && !isAnsweredCorrect;

              return (
                <button
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer"
                  )}
                  key={activeQuestion._id + "-" + option.id}
                  disabled={hasAttempted}
                  onClick={() => handleClick(option)}
                >
                  {option.value}
                  {isThisSelected ? (
                    <span
                      className={clsx(
                        isOptionCorrect && "correct-radio",
                        isOptionIncorrect && "incorrect-radio"
                      )}
                    >
                      {isOptionCorrect && (
                        <img src={assets.checkCircleGreen} alt="green circle" />
                      )}
                      {isOptionIncorrect && (
                        <img
                          src={assets.incorrectCross}
                          alt="cross"
                          className="cross"
                        />
                      )}
                    </span>
                  ) : (
                    <span className="unattempted-radio" />
                  )}
                </button>
              );
            })}
          </div>
        {isFinalQuestion ? (
  <Button disabled={!hasAttempted} size="large" onClick={showResultScreen}>
    Submit
  </Button>
) : (
  <Button
    size="large"
    icon={<NextArrowIcon />}
    iconPosition="right"
    disabled={!hasAttempted} 
    onClick={activeNextQuestion} 
  >
    Next
  </Button>
)}

        </Card>
      </div>
    </section>
  );
};

export default QuestionScreen;
