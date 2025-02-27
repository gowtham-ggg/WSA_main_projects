import React, { useContext, useMemo } from "react";
import QuestionContext from "../../store/QuestionContext";
import clsx from "clsx";

const ProgressBar = () => {
  const { activeQuestionNumber, totalQuestions } = useContext(QuestionContext);

  const progressText = useMemo(()=>`${((activeQuestionNumber/totalQuestions)*100).toFixed(2)}%`)

  const isFinalQuestion = useMemo(()=>activeQuestionNumber === totalQuestions,[activeQuestionNumber,totalQuestions])

  return <progress value={activeQuestionNumber} max={totalQuestions} className={clsx("progress-bar",isFinalQuestion && "final-question")}>
    {progressText}
  </progress>
};

export default ProgressBar;
