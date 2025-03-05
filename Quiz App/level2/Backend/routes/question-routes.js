const express = require("express");
const router = express.Router();
const QuestionModel = require("../model/question-model");
const authUser = require("../middleware/user-middleware");

const MAX_QUESTION_COUNT = 30;

const {
  UserQuiz: UserQuizModel,
  QUIZ_STATUS_PENDING,
  ANSWER_STATUS_RIGHT,
  ANSWER_STATUS_WRONG,
  ANSWER_STATUS_PENDING,
} = require("../models/user-quiz-model");

// Fetch random questions
router.get("/", authUser, async (req, res) => {
  try {
    // Check if a pending quiz exists for the user
    let userCurrentQuiz = await UserQuizModel.findOne({
      user_id: req.user._id,
      quiz_status: QUIZ_STATUS_PENDING,
    });

    // Create a new quiz if no pending quiz exists
    if (!userCurrentQuiz) {
      const newQuestions = await QuestionModel.aggregate([
        { $sample: { size: MAX_QUESTION_COUNT } },
        { $project: { question: 1, options: 1 } },
      ]);

      const questionData = newQuestions.map(({ _id }) => ({
        question_id: _id,
        attempted: false,
        answer_status: ANSWER_STATUS_PENDING,
      }));

      // Save new quiz to DB
      userCurrentQuiz = await UserQuizModel.create({
        user_id: req.user._id,
        quiz_status: QUIZ_STATUS_PENDING,
        questions: questionData,
      });
    }

    // Create a lookup map for quiz questions
    const quizMap = new Map(
      userCurrentQuiz.questions.map((q) => [q.question_id.toString(), q])
    );

    // Fetch all questions from DB
    const questions = await QuestionModel.find({
      _id: { $in: [...quizMap.keys()] },
    })
      .select("question options")
      .lean();

    // Format response data
    const result = questions.map(({ _id, ...rest }) => ({
      ...rest,
      attempted: quizMap.get(_id.toString()).attempted,
      answer_status: quizMap.get(_id.toString()).answer_status,
    }));

    res.status(200).json({ success: true, questions: result });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions. Please try again later.",
    });
  }
});

// Validate submitted answer
router.post("/validate-answers", authUser, async (req, res) => {
  try {
    const { questionId, answer } = req.body;

    // Validate input
    if (!questionId || !answer || typeof answer.id !== "number" || !answer.value) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: questionId, answer.id, or answer.value.",
      });
    }

    // Find question in DB
    const question = await QuestionModel.findById(questionId);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found." });
    }

    // Compare user's answer
    const answerStatus =
      question?.answer?.id === answer.id && question?.answer?.value === answer.value
        ? ANSWER_STATUS_RIGHT
        : ANSWER_STATUS_WRONG;

    // Update user's quiz data
    const updatedUserQuiz = await UserQuizModel.findOneAndUpdate(
      {
        "questions.question_id": questionId,
        user_id: req.user._id,
        quiz_status: QUIZ_STATUS_PENDING,
      },
      {
        $set: {
          "questions.$.attempted": true,
          "questions.$.answer_status": answerStatus
          ? ANSWER_STATUS_RIGHT 
          : ANSWER_STATUS_WRONG,
          "questions.$.submitted_answer": answer, 
        },
      },
      { new: true }
    );

    if (!updatedUserQuiz) {
      return res.status(400).json({
        success: false,
        message: "Quiz data not found or already completed.",
      });
    }

    // Update quiz result
    await updatedUserQuiz.updateResult();

    return res.status(200).json({
      success: true,
      status: answerStatus === ANSWER_STATUS_RIGHT ? 1 : 0,
      message: answerStatus === ANSWER_STATUS_RIGHT ? "Correct answer!" : "Wrong answer!",
      submitted_answer : answer,
      correctAnswer  : answer
    });
  } catch (error) {
    console.error("Error validating answers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to validate the answer. Please try again later.",
    });
  }
});

module.exports = router;
