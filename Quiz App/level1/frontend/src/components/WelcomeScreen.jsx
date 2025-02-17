import React from "react";
import Card from "./ui/Card";
import QuizLogo from "./ui/QuizLogo";
import assets from "../assets/assets";
import Button from "./ui/Button";

const WelcomeScreen = () => {
  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={assets.questionBubble} width={172} alt="" />
          <h2>Are you Ready?</h2>
          <h3>Let's see how many questions you can answer :</h3>
        </div>
        <ul className="welcome-card-list">
            <li className="list-item"> <img src={assets.checkCircleGreen} alt="green circle" /> There are 30 Questions</li>
            <li className="list-item"> <img src={assets.checkCircleGreen} alt="green circle" /> You need to pick one answer</li>
        </ul>
        <Button />
      </Card>
    </section>
  );
};

export default WelcomeScreen;
