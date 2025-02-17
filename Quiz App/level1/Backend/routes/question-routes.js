const express = require("express");
const router = express.Router();

const QuestionModel = require("../model/question-model");
const questionModel = require("../model/question-model");

const MAX_QUESTION_COUNT = 30;

router.get("/", async (req, res) => {
  try {
    // Fetch random questions from the database
    const questions = await QuestionModel.aggregate([
      { $sample: { size: MAX_QUESTION_COUNT } },
      { 
        $project: { 
          question: 1, 
          options: 1  
        } 
      }
    ]);
    
    // Respond with the fetched questions
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    // Send a response with error details
    res.status(500).json({ success: false, message: "Failed to fetch questions. Please try again later." });
  }
});

// Route to validate the answer submitted by the user
router.post("/validate-answers", async (req, res) => {
  try {
    const { id, answer } = req.body;

    // Check for missing fields in the request
    if (!id || !answer || !answer.id || !answer.value) {
      return res.status(400).json({ message: "Missing required fields: id, answer id, or answer value." });
    }

    // Fetch the question from the database using the provided id
    const question = await questionModel.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found. Please check the question ID." });
    }

    // Check if the provided answer matches the correct answer
    if (question.answer.id === answer.id && question.answer.value === answer.value) {
      return res.status(200).json({ status: 1, message: "Correct answer!" });
    } else {
      return res.status(200).json({ status: 0, message: "Incorrect answer. Please try again." });
    }
  } catch (error) {
    console.error("Error validating answers:", error);
    res.status(500).json({ success: false, message: "Failed to validate the answer. Please try again later." });
  }
});

module.exports = router;
