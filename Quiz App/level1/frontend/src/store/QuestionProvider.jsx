import React, { useCallback, useMemo, useState } from "react";
import QuestionContext from "./QuestionContext";

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  // Store active question ID
  const [activeQuestionId, setActiveQuestionId] = useState("");

  // Process questions from API response
  const processQuestions = useCallback((questionApiResponse) => {
    setQuestions(
      questionApiResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false,
      }))
    );
    setActiveQuestionId(questionApiResponse[0]._id);
  }, []);

  // Get the active question
  const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions]
  );

  // Get the active question number (1-based index)
  const activeQuestionNumber = useMemo(
    () =>
      questions.findIndex((question) => question._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  );

  // Get the total number of questions
  const totalQuestions = useMemo(() => questions.length, [questions]);

  // Update question status
  const updateQuestions = useCallback(
    (isAnswerCorrect) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question
        )
      );
    },
    [activeQuestionId]
  );

  // Move to the next question
  const activeNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (question) => question._id === activeQuestionId
    );
    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionId(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  // Storing correct answers
  const correctAnswers = useMemo(
    () => questions.filter((question) => question.isAnswerCorrect).length,
    [questions]
  );


  const contextValue = useMemo(
    () => ({
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      updateQuestions,
      activeNextQuestion,
      setActiveQuestionId,
      correctAnswers,
      processQuestions,
    }),
    [
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      updateQuestions,
      activeNextQuestion,
      setActiveQuestionId,
      correctAnswers,
      processQuestions,
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionProvider;
