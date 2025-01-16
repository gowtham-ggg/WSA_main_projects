import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

    title :String,
    description : String,
    due_date : Date

})

const TaskModel = mongoose.models.Task || mongoose.model('Task', taskSchema)

export default TaskModel