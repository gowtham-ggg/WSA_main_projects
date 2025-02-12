const express = require("express");
const router = express.Router();

const QuestionModel = require("../model/question-model");

const MAX_QUESTION_COUNT = 30;

router.get("/", async (req, res) => {
  try {
    const questions = await QuestionModel.aggregate([
      { $sample: { size: MAX_QUESTION_COUNT } },
      { 
        $project: { 
          question: 1, 
          options: 1  
        } 
      }
    ]);
    
    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error Fetching Questions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router; 
