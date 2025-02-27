import React, { useCallback, useState } from "react";
import Card from "./ui/Card";
import QuizLogo from "./ui/QuizLogo";
import assets from "../assets/assets";
import Button from "./ui/Button";
import UseQuestionContext from "../hook/UseQuestionContext";
import fetchQuestionApi from "../api/FetchQuestionApi";
import handleError from "../utils/handleError";

const WelcomeScreen = (props) => {
  const { showQuestionScreen } = props;
  const { processQuestions } = UseQuestionContext();
  const [loading, setLoading] = useState(false); 

  const handleResponse = useCallback(
    function (responseData) {
      processQuestions(responseData.questions);
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen]
  );

  const beginQuiz = useCallback(
    function () {
      fetchQuestionApi(handleResponse, handleError, setLoading);
    },
    [handleResponse, setLoading] 
  );

  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={assets.questionBubble} width={172} alt="" />
          <h2>Are you Ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={assets.checkCircleGreen} alt="green circle" /> There are 30 Questions
          </li>
          <li className="list-item">
            <img src={assets.checkCircleGreen} alt="green circle" /> You need to pick one answer
          </li>
        </ul>
        <Button
          size="large"
          onClick={beginQuiz}
          loading={loading}
          loadingText="Starting the quiz"
        >
          I'm Ready, Start the Quiz
        </Button>
      </Card>
    </section>
  );
};

export default WelcomeScreen;
