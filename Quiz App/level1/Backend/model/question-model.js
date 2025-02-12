const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question:  String,
    options: [{ id: Number, value: String }], 
    answer: { id: Number, value: String } 
});

module.exports = mongoose.models.QuestionData || mongoose.model("QuestionData", QuestionSchema);
