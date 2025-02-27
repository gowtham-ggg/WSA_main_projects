import React, { useState, useContext, useCallback } from "react";
import QuizLogo from "./ui/QuizLogo";
import assets from "../assets/assets";
import Button from "./ui/Button";
import Card from "./ui/Card";
import QuestionContext from "../store/QuestionContext";
import fetchQuestionApi from "../api/FetchQuestionApi";
import handleError from "../utils/handleError";

const RestartIcon = () => <img src={assets.restartIcon} alt="Restart Icon" />;

const ResultScreen = ({ showQuestionScreen }) => { 
  const [loading, setLoading] = useState(false);
  const { 
    correctAnswers, 
    totalQuestions, 
    processQuestions, 
    setActiveQuestionId 
  } = useContext(QuestionContext); 

  const percentage = (correctAnswers / totalQuestions) * 100;
  let feedbackText =
    percentage >= 90
      ? "Excellent Job!"
      : percentage >= 70
      ? "Good Job!"
      : percentage >= 50
      ? "You did okay!"
      : "You could do better!";

  const handleResponse = useCallback(
    (responseData) => {
      processQuestions(responseData.questions);
      setActiveQuestionId(responseData.questions[0]._id);
      showQuestionScreen(); 
    },
    [processQuestions, setActiveQuestionId, showQuestionScreen]
  );

  const beginQuiz = () => {
    fetchQuestionApi(handleResponse, handleError, setLoading);
  };

  return (
    <section className="result-section">
      <QuizLogo size="large" />
      <Card className="result-card">
        <div className="result-icon-wrapper">
          <img src={assets.trophy} alt="Trophy" />
        </div>
        <h1>{feedbackText}</h1>
        <div className="result-details">
          <span className="correct-answers">{correctAnswers}</span>
          <p className="total-questions">
            Questions <br /> out of <span className="weight-700">{totalQuestions}</span>
          </p>
        </div>

        <Button icon={<RestartIcon />} size="large" onClick={beginQuiz} disabled={loading} iconPosition="right">
          {loading ? "Loading..." : "Restart"}
        </Button>
      </Card>
    </section>
  );
};

export default ResultScreen;
