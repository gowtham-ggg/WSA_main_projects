const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    question:  String,
    options: [{ id: Number, value: String }], 
    answer: { id: Number, value: String } ,
    created_at :{type : Date, default : Date.now},
    updated_at : {
        type : Date, default : Date.now
    }
});

module.exports = mongoose.models.Question || mongoose.model("Question", QuestionSchema);

