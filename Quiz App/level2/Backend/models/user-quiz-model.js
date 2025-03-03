const mongoose = require("mongoose");

const QUIZ_STATUS_PENDING = "pending";
const QUIZ_STATUS_COMPLETED = "completed";

const ANSWER_STATUS_PENDING = "pending";
const ANSWER_STATUS_RIGHT = "right";
const ANSWER_STATUS_WRONG = "wrong";

const userQuizSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quiz_status: {
    type: String,
    enum: [QUIZ_STATUS_PENDING, QUIZ_STATUS_COMPLETED],
  },
  questions: [
    {
      _id: false,
      question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
      attempted: Boolean,
      answer_status: {
        type: String,
        enum: [ANSWER_STATUS_PENDING, ANSWER_STATUS_RIGHT, ANSWER_STATUS_WRONG],
      },
      Submitted_answer: {
        _id: false,
        id: Number,
        value: String,
      },
    },
  ],
  result: {
    correct_count: { type: Number, default: 0 },
    incorrect_count: { type: Number, default: 0 },
  },
});

// Method to update quiz result
userQuizSchema.methods.updateResult = async function () {
  let result = this.questions.reduce(
    (acc, cur) => {
      if (cur.answer_status === ANSWER_STATUS_RIGHT) {
        acc.correct_count += 1;
      } else if (cur.answer_status === ANSWER_STATUS_WRONG) {
        acc.incorrect_count += 1;
      }
      return acc;
    },
    { correct_count: 0, incorrect_count: 0 }
  );

  this.result = result;
  await this.save(); 
};

const UserQuiz = mongoose.models.UserQuiz || mongoose.model("UserQuiz", userQuizSchema, "user_Quizzes");

module.exports = {UserQuiz,
  QUIZ_STATUS_COMPLETED,
  QUIZ_STATUS_PENDING,
  ANSWER_STATUS_RIGHT,
  ANSWER_STATUS_WRONG,
  ANSWER_STATUS_PENDING
}
